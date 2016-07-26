[![Stories in Ready](https://badge.waffle.io/Ubiquitous-Marmosets/Project-T2.png?label=ready&title=Ready)](https://waffle.io/Ubiquitous-Marmosets/Project-T2)
# project-trendwave

Getting started:

Initial setup:
- Run 'npm install' for dependencies
- 'npm start' will get the server up and running
- Install MySQL if you haven't already

Database Configuration:
- We have been using 'trendwave' as the database name, root' as the username and 'cake' as the password for MySQL (you can change these settings in the database.js file)
- You will also need to format your database to accept utf8mb4 rather than utf8 (because some headlines use emojis)
- Run the following two lines in MySQL to reformat:
- to reformat the database: "ALTER DATABASE trendwave CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;"
- to reformat the table: "ALTER TABLE FB_Sentiments CONVERT TO CHARACTER SET utf8mb4 COLLATE;"

Api Keys:
- You will need to get api keys for the following:
  Google trends
	Watson's API
	Twitter 

Overview of Google Trends:

We are pulling the top trends according to Google searches for a given moment in time. This list of trends will update to the latest ones when you refresh the page.

Overview of Watson Analysis:

Watson is being used to analyze the data gathered from Twitter on a certain topic. Unfortunately, a key constraint with Watson is that it limits the number of requests you can send to it on a daily basis (~1000 requests). Therefore, we are aggregating all of the tweets (~500 tweets at a time) into one large string and sending this text to Watson (rather than sending a request to watson for each individual tweet). From comparison tests, we found the results to be similar when Watson analyzes tweets in aggregate vs. individual tweets.

There are some other cool tools available from Watson and more in-depth analysis linguistic that can be done. We chose to just use a positive vs. negative analysis to keep things simple. Also, from our tests Watson's results were questionable when running emotional sentiment analysis (it appeared to have an overweight bias toward believing news articles to be angry and an underweight bias to some other emotions). There are a slew of other sentiment analysis engines available besides Watson that you can play around with.

Overview of Twitter Data:

We are using Twitter in two capacities: 1) gather a sample of the most recent tweets on a given topic and 2) gather the top two most popular tweets on a given topic. One key constraint of Twitter is that it allows you to only pull up to 100 tweets at a time. Thus, we are making 5 requests to Twitter to gather 500 tweets. We found this to be a happy-ish medium between having a set of tweets that is representative vs. the client having to endure a slow response time (more than ~3 seconds) on the front end while they wait for the backend to gather more than 500 tweets.

Overview of Facebook:

We are using Facebook in one capacity: to show the emotional reaction of Facebook users to a specific trend (angry, sad, haha, wow, etc). We are running a python webscraper (path: ./server/facebookScraper/fbScrape.py) to gather all articles and their Facebook reactions from 28 news sources with the on a regular basis. The python scraper can be run manually in the terminal with 'python fbScrape.py'. This process takes roughly ~30 seconds for each news source. These CSV files are then loaded into the FB_Sentiments table in MySQL on a regular basis with a shell script (path: ./server/updateCsv.sh). Once the articles are loaded into the database, we can now query the headline data for keywords that match the keywords of a certain trend. Because the trends from Google may have very specific naming conventions, we found the best query results in MySQL were found by taking the first two keywords of a Google trend. For example, if the Google trend is 'Kyle Cho invents the most amazing app ever' you probably won’t find any news article headlines that use that exact same text convention and the MySQL query would thus return 0 results. However, if you search MySQL using the first two key words 'Kyle Cho', you'll grab a lot more articles relevant to the topic.

Design Schema:

![Alt text](/schema.png?raw=true "Title")

