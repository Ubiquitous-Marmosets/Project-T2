var routes = require('express').Router();
var googleTrends = require('google-trends-api');
var Twitter = require('twitter');
var fs = require('fs');
var api_key = require('../../api_keys.js')
var db = require('../database');
var watson = require('watson-developer-cloud');
var Promise = require('bluebird');

// We are using the 'watson-developer-cloud' npm module
// See documentation for examples of how to request data from Watson using this module

// Setup the alchemy_language variable to use the api key from the api key file
var alchemy_language = watson.alchemy_language({
  api_key: api_key.watson_api_key
});

// Function to get the positive vs. negative sentiment from Watson
// Written as a promise so multiple requests can be made, if needed
var getSentiment = function(params) {
	return new Promise(function(resolve, reject) {
		alchemy_language.sentiment(params, function (err, response) {
		  if (err) {
		    reject(err);
		  } else {
		  	resolve(response.docSentiment);
		  }
		});
	})
};

module.exports = {

	// grabTweets makes five requests to Twitter to pull the ~500 most recent tweet data on a topic
	// then the tweet data is sent in aggregate to Watson for analysis
	grabTweets: function(req, res) {
		var query = req.body.q;
		var grabTweets = new Twitter({

		 consumer_key: api_key.consumer_key,
		 consumer_secret: api_key.consumer_secret,
		 access_token_key: api_key.access_token_key,
		 access_token_secret: api_key.access_token_secret

		});

		// Set an initial max_id that will be far above any tweet ID received
		var max_id = 100000000000000000000000000000000000000;

		// Declare a string variable which we will add tweet data to
		var tweetString = '';


		var counter = 0;

		// Promise function to get the 100 most recent Tweets from twitter
		var callTwitter = function() {
			return new Promise(function(resolve, reject) {
				grabTweets.get('search/tweets', {q: query, count: 100, result_type: 'recent', lang: 'en', result_type: 'recent', max_id: max_id}, function(error, tweets) {
				  if (error) {
				 		reject(error)
				  } else {

				  	// Declare cash variable used later to get the new max_id
				  	var newMaxId = [];

				  	// find the new max_id
				  	for (var i = 0; i < tweets.statuses.length; i++) {
				  		newMaxId.push(tweets.statuses[i].id)
				  	}

				  	// overwrite the max_id with the new max_id (so that we can find the next 100 tweets in the next call)
				  	newMaxId.sort()
				  	max_id = newMaxId[0] - 10;

				  	// build up the tweetString variable and scrub the text with regex
				  	resolve(
					   	tweets.statuses.forEach(function(tweetObj, index) {
					   		counter++
					      tweetString += tweetObj.text
					      .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
					      .replace(/[`❤️~@#$%^&*()_|☆+\-=;:<>\{\}\[\]\\\/]/gi, ' ')

					    })
				    )
				  }
				})
			})
		}


		// Make five calls to Twitter and gather ~500 tweets
		callTwitter().then(function() {
			callTwitter().then(function() {
				callTwitter().then(function() {
					callTwitter().then(function() {
						callTwitter().then(function() {

							// Send the tweets to Watson for analysis
							getSentiment({text: tweetString}).then(function(data) {

								var positive = 0;
								var negative = 0;

								if (data.type === 'positive') {
									// reweight the positive and negative scores to add up to 100%
									positive = (1 + Number(data.score)) / 2;
									negative = 1 - positive;
									res.send({summary: 'Mostly Positive', positive: positive, negative: negative});
								} else {
									// reweight the positive and negative scores to add up to 100%
									negative = Math.abs((Number(data.score) - 1) / 2);
									positive = 1 - negative;
									res.send({summary: 'Mostly Negative', positive: positive, negative: negative});
								}
							});

						});
					});
				});
			});
		});

	},

	// Get the top two tweets on a topic
	grabTopTweet: function(req, res) {

		var query = req.body.q;
		var grabTweets = new Twitter({

		 consumer_key: api_key.consumer_key,
		 consumer_secret: api_key.consumer_secret,
		 access_token_key: api_key.access_token_key,
		 access_token_secret: api_key.access_token_secret

		});

		// Searh for 'popular' tweets
		grabTweets.get('search/tweets', {q: query, count: 3, result_type: 'popular', lang: 'en'}, function(error, tweets) {
			if (error) {
				throw error
			} else {

				// Calculate time of tweets
				var firstTweetTime = Math.round((new Date().getTime() - new Date(tweets.statuses[0].created_at).getTime()) / 3600000);
				var secondTweetTime = Math.round((new Date().getTime() - new Date(tweets.statuses[1].created_at).getTime()) / 3600000);

				// Send top two tweets to front end
				// console.log(tweets.statuses[0].text)
				res.json({
          firstUser: tweets.statuses[0].user.screen_name,
          firstTweet: tweets.statuses[0].text,
          firstTweetTime: firstTweetTime,
          secondUser: tweets.statuses[1].user.screen_name,
          secondTweet: tweets.statuses[1].text,
          secondTweetTime: secondTweetTime});
			}
		});
	}

}
