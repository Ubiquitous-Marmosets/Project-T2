var Sequelize = require('Sequelize');
var sequelize = new Sequelize('trendwave', 'root', 'cake');
var mysql = require('mysql');

// Table for top trends
// Not currently being used but could be used to track trends
var Trends = sequelize.define('Trends', {
 name: Sequelize.STRING
});

// Table for tracking Twitter sentiments
// Not currently being used but could be used to track sentiment over time on a topic
var Twitter_Sentiments = sequelize.define('Twitter_Sentiments', {
  neutral: Sequelize.DECIMAL,
  positive: Sequelize.DECIMAL,
  negative: Sequelize.DECIMAL
});

// Table to storing articles from news sources and their emotional reactions on Facebook
var FB_Sentiments = sequelize.define('FB_Sentiments', {
  page_name: Sequelize.STRING,
  status_id: Sequelize.STRING,
  status_message: Sequelize.STRING(2000),
  link_name: Sequelize.STRING,
  status_type: Sequelize.STRING,
  status_link: Sequelize.STRING,
  status_published: Sequelize.STRING,
  num_reactions: Sequelize.INTEGER,
  num_comments: Sequelize.INTEGER,
  num_shares: Sequelize.INTEGER,
  num_likes: Sequelize.INTEGER,
  num_loves: Sequelize.INTEGER,
  num_wows: Sequelize.INTEGER,
  num_hahas: Sequelize.INTEGER,
  num_sads: Sequelize.INTEGER,
  num_angrys: Sequelize.INTEGER
});

FB_Sentiments.removeAttribute('id');

// Sync tables to database
Trends.sync().then(Twitter_Sentiments.sync().then(FB_Sentiments.sync()));

// Export for use on the Controllers files
exports.Trends = Trends;
exports.Twitter_Sentiments = Twitter_Sentiments;
exports.FB_Sentiments = FB_Sentiments;