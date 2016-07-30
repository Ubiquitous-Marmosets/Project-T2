import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, StatusBar} from 'react-native';
import SideMenu from 'react-native-side-menu';

import PieChart from './components/PieChart';
import PopTweets from './components/PopTweets';
import PopHeadlines from './components/PopHeadlines';
import TrendScore from './components/TrendScore';
import EmotionalFeedback from './components/EmotionalFeedback';
import Sentiment from './components/sentiment';
import Menu from './components/Menu';
import moment from 'moment';


export default class Trendwave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popTweets: ['schwag'],
      selectedTrend: 'Stephen Curry',
      trends:[],
      menuOpen: false
    };
  }

  componentWillMount(){
    fetch('http://localhost:3000/trends')
    .then(response => response.json())
    .then(res => {
      this.setState({trends:res});
    });

  }

  fetchTrend(trend) {
    this.setState({menuOpen: false, selectedTrend: trend});
    // fetch('http://localhost:3000/grabTweets', {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ q: trend })//q })
    // })
    // .then(res => res.json())
    // .then(response => this.setState({popTweets: response, selectedTrend: trend}))
    // .then(() =>)
    // .catch(err => console.log('err:', err));
    // 
    fetch('http://localhost:3000/grabTopTweet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: trend})
    }).then(res => res.json())
    .then(response => {
      let firstTweet = `${response.firstUser}: ${response.firstTweet} \n ${moment(response.firstTweetTime).fromNow()}`;
      let secondTweet = `${response.secondUser}: ${response.secondTweet} \n ${moment(response.secondTweetTime).fromNow()}`;
      this.setState({
        popTweets: {
          firstTweet: firstTweet,
          secondTweet: secondTweet
          }
      });
    })
    .catch(response => console.log('Top Tweet Grab Error:', response));
  }


  render() {
    const menu = <Menu isOpen={this.state.menuOpen} fetchTrend={this.fetchTrend.bind(this)} trends={this.state.trends}/>;

    return (
        <SideMenu menu={menu}>
        <StatusBar hidden= 'true' />
          <ScrollView style={styles.container}>
            <PieChart styles={styles.chart} />
            <PopTweets popTweets={this.state.popTweets} selectedTrend={this.state.selectedTrend}/>
            <PopHeadlines />
            <TrendScore />
            <EmotionalFeedback />
            <Sentiment />
            {/*<Component>*/}
            {/*<Component>*/}
            {/*<Component>*/}
          </ScrollView>
        </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  // sideMenu:{
  //   backgroundColor: '#33ccff'
  // },
  container: {
    backgroundColor: 'white'
  }
});
