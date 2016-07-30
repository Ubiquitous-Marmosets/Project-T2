import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import PieChart from './components/PieChart';
import PopTweets from './components/PopTweets';
import PopHeadlines from './components/PopHeadlines';
import TrendScore from './components/TrendScore';
import EmotionalFeedback from './components/EmotionalFeedback';

// Here we can use import statesments using the
// naming convention component.ios.js and component.android.js

// import Component from  './components/component' }

// fetch('http://localhost:3000/trends').then(response => response.json())
//   .then(res => console.log('/trends',res))
//   .catch(err => console.log('err:', err));
//
// fetch('http://localhost:3000/grabTweets', {
//   method: "POST",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ q: 'Donald Trump' })//q })
// }).then(res => res.json()).then(response => console.log('/grabTweets', response))
// .catch(err => console.log('err:', err));

export default class Trendwave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popTweets: [],
      popHeadlines: []
    };
  }

  componentWillMount() {
    // *** start of logic for popTweets
      // hard-coded response to limit
      // twitter api calls during dev
      // let response = {
      //   firstUser: 'sbstryker',
    	//   firstTweet: 'HRC: "I need you to destroy Donald Trump. Absolutely ether him. Say \'malarkey\' too."\n\nJoe: "Say no more fam." https://t.co/aXUWsSZuav',
    	//   firstTweetTime: 21,
    	//   secondUser: 'nytimes',
    	//   secondTweet: 'Breaking News: Donald Trump called on Russia to hack Hillary Clinton\'s email https://t.co/KMP1YUCkJ1 https://t.co/RbLffoyGxQ',
    	//   secondTweetTime: 30
      // };

      fetch('http://localhost:3000/grabTopTweet', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: 'Donald Trump'})
      })
      .then(res => res.json())
      .then(response => {
        this.setState({
            popTweets: response
          });
      })
      .catch(err => console.log('err:', err));
    // *** end of logic for popTweets

    // *** start of logic for popHeadlines
    // fb seed data for dev
    var summary = {
      summary: 'Mostly Surprised',
      topHeadline: 'topArticle.title',
      secondHeadline: 'secondArticle.title',
      likes: 30,
      loves: 20,
      wows: 20,
      hahas: 10,
      sads: 13,
      angrys: 7
    };

    this.setState({
      popHeadlines: summary
    });
    // *** end of logic for popHeadlines
  }

  render() {
    return (
      <ScrollView>
        <Text>TrendWave</Text>
        <PieChart />
        <PopTweets popTweets={this.state.popTweets} />
        <PopHeadlines topHeadline={this.state.popHeadlines.topHeadline} secondHeadline={this.state.popHeadlines.secondHeadline} />
        <TrendScore />
        <EmotionalFeedback />
        {/*<Component>*/}
        {/*<Component>*/}
        {/*<Component>*/}
      </ScrollView>
    );
  }
}
