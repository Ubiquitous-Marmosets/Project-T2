import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import PieChart from './components/PieChart';
import PopTweets from './components/PopTweets';
import PopHeadlines from './components/PopHeadlines';
import TrendScore from './components/TrendScore';
import EmotionalFeedback from './components/EmotionalFeedback';
import Sentiment from './components/sentiment';

// Here we can use import statesments using the
// naming convention component.ios.js and component.android.js

// import Component from  './components/component' }

fetch('http://localhost:3000/trends').then(response => response.json())
  .then(res => console.log('/trends',res))
  .catch(err => console.log('err:', err));

fetch('http://localhost:3000/grabTweets', {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ q: 'Donald Trump' })//q })
}).then(res => res.json()).then(response => console.log('/grabTweets', response))
.catch(err => console.log('err:', err));

export default class Trendwave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popTweets: []
    };
  }

  componentWillMount() {
    // *** start of logic for popTweets
      // hard-coded response to limit
      // twitter api calls during dev
      let response = {
        firstUser: 'sbstryker',
    	  firstTweet: 'HRC: "I need you to destroy Donald Trump. Absolutely ether him. Say \'malarkey\' too."\n\nJoe: "Say no more fam." https://t.co/aXUWsSZuav',
    	  firstTweetTime: 21,
    	  secondUser: 'nytimes',
    	  secondTweet: 'Breaking News: Donald Trump called on Russia to hack Hillary Clinton\'s email https://t.co/KMP1YUCkJ1 https://t.co/RbLffoyGxQ',
    	  secondTweetTime: 30
      };

      // fetch('http://localhost:3000/grabTopTweet', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ q: 'Donald Trump'})
      // }).then(res => res.json())
      // .then(response => {
        this.setState({
          popTweets: response
        });
        console.log('/grabTopTweet', response)
      // })
      // .catch(err => console.log('err:', err));
    // *** end of logic for popTweets
  }

  componentWillMount(){
    fetch('http://localhost:3000/trends').then(response => response.json()).then(res => console.log(res));

    fetch('http://localhost:3000/grabTweets', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: 'Donald Trump' })//q })
    }).then(res => res.json()).then(response => console.log(response))
    .catch(response => console.log(response));

    fetch('http://localhost:3000/grabTopTweet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: 'Donald Trump'})
    }).then(res => res.json()).then(response => console.log(response))
    .catch(response => console.log(response));
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>TrendWave</Text>
        <PieChart />
        <PopTweets popTweets={this.state.popTweets}/>
        <PopHeadlines />
        <TrendScore />
        <EmotionalFeedback />
        <Sentiment />
        {/*<Component>*/}
        {/*<Component>*/}
        {/*<Component>*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 1000
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
