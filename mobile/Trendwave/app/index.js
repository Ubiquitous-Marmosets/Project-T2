import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PieChart from './components/PieChart';
import PopTweets from './components/PopTweets';
import PopHeadlines from './components/PopHeadlines';
import TrendScore from './components/TrendScore';
import EmotionalFeedback from './components/EmotionalFeedback';

// Here we can use import statesments using the
// naming convention component.ios.js and component.android.js

// import Component from  './components/component' }

fetch('http://localhost:3000/trends').then(response => response.json()).then(res => console.log(res));

fetch('http://localhost:3000/grabTweets', {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ q: 'Donald Trump' })//q })
}).then(res => res.json()).then(response => console.log(response));

fetch('http://localhost:3000/grabTopTweet', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ q: 'Donald Trump'})
}).then(res => res.json()).then(response => console.log(response));

export default class Trendwave extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TrendWave</Text>
        <PieChart />
        <PopTweets />
        <PopHeadlines />
        <TrendScore />
        <EmotionalFeedback />
        {/*<Component>*/}
        {/*<Component>*/}
        {/*<Component>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  }
});
