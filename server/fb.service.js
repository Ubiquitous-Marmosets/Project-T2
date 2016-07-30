const graph = require('fbgraph');
const Promise = require('bluebird');
const FB_Sentiments = require('./database').FB_Sentiments;

graph.setAccessToken('605873279587083|1e0e1365da5716e80b1eb898b73dd9cb');
graph.setAppSecret('1e0e1365da5716e80b1eb898b73dd9cb');
 
let fb = Promise.promisify(graph.get);

/**
 * Fetches `numPosts` posts from the given page and makes subsequent
 * requests for reaction data for each of them.
 * 
 * @param  {string}   pageName Name of the page on Facebook
 * @param  {number}   numPosts Number of posts to pull
 * @return {Promise}           Promise containing an array of `FB_Sentiment`s
 */
function fetchPagePosts(pageName, numPosts) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let sentiments = [];

    fb(`/${pageName}/posts`, {
      fields: 'message,link,created_time,type,name,id,comments.limit(0).summary(true),shares,reactions.limit(0).summary(true)',
      limit: numPosts
    }).then(res => {
      res.data.forEach(post => {
        fb(`/${post.id}`, {
          fields: 'reactions.type(LIKE).limit(0).summary(total_count).as(like),reactions.type(LOVE).limit(0).summary(total_count).as(love),reactions.type(WOW).limit(0).summary(total_count).as(wow),reactions.type(HAHA).limit(0).summary(total_count).as(haha),reactions.type(SAD).limit(0).summary(total_count).as(sad),reactions.type(ANGRY).limit(0).summary(total_count).as(angry)'
        }).then(reactions => {
          sentiments.push(FB_Sentiments.build({
            page_name: pageName,
            status_id: post.id,
            status_message: post.message,
            link_name: post.name,
            status_type: post.type,
            status_link: post.link,
            status_published: post.created_time,
            num_reactions: post.reactions.summary.total_count,
            num_comments: post.comments.summary.total_count,
            num_shares: post.shares ? post.shares.count : 0,
            num_likes: reactions.like.summary.total_count,
            num_loves: reactions.love.summary.total_count,
            num_wows: reactions.wow.summary.total_count,
            num_hahas: reactions.haha.summary.total_count,
            num_sads: reactions.sad.summary.total_count,
            num_angrys: reactions.angry.summary.total_count,
          }));

          if (++count === numPosts) {
            resolve(sentiments);
          }
        });
      });
    }).catch(err => {
      reject(err);
    });
  });
}

var pages = ['cnn',
  'nytimes',
  'huffingtonpost',
  'NPR',
  'usatoday',
  'time',
  'yahoonews',
  'FoxNews',
  'bbcnews',
  'wsj',
  'TMZ',
  'EntertainmentTonight',
  'enews',
  'UsWeekly',
  'PopSci',
  'ABCNews',
  'NBCNews',
  'washingtonpost',
  'theguardian',
  'PopSugar',
  'EntertainmentTonight',
  'InTouchWeekly',
  'entertainmentweekly',
  'Cosmopolitan',
  'peoplemag',
  'BuzzFeed',
  'Gawker',
  'Esquire'
];

// TODO this can fail is a page has < numPosts posts
function run() {
  return new Promise((resolve, reject) => {
    let numPosts = 25;
    let count = 0;
    let now = new Date();
    pages.forEach(pageName => {
      fetchPagePosts(pageName, numPosts).then(posts => {
        posts.forEach(post => {
          post.save().then(post => {
            if (++count === pages.length * numPosts) {
              resolve();
            }
          });
        });
      }).catch(err => reject(err));
    });
    FB_Sentiments.destroy({where: {createdAt: {$lt: now}}});
  });
}

module.exports = {
  run
}
