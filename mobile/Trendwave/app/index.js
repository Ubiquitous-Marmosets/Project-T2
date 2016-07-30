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
import TrendBar from './components/trendbar';


export default class Trendwave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popTweets: ['schwag'],
      selectedTrend: 'Stephen Curry',
      trends:[],
      menuOpen: false,
      fbData: {},
      headlines: {
        topHeadline: 'topHeadline',
        secondHeadline: 'secondHeadline'
      }
    };
  }

  componentWillMount(){
    fetch('http://localhost:3000/trends')
    .then(response => response.json())
    .then(res => {
      this.setState({trends:res});
    })
    .catch(error => console.log('Get Trends Error:', error));
  }

  fetchTrend(trend) {
    this.setState({menuOpen: false, selectedTrend: trend});
    //Sentiment analysis
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
    })
    .then(res => res.json())
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
    .catch(response => console.log('Top Tweet Grab Error:', response))
    .then(() => {
      fetch('http://localhost:3000/grabFbook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: trend})
      })
      .then(res => res.json())
      .then(res => this.setState(
        {
          headlines: {
            topHeadline: res.topHeadline,
            secondHeadline: res.secondHeadline
          },
          fbSentiment: {
            likes: res.likes,
            loves: res.loves,
            wows: res.wows,
            hahas: res.hahas,
            sads: res.sads,
            angries: res.angrys
          }
        })
      );
    });
  }


  render() {
    const menu = <Menu isOpen={this.state.menuOpen} fetchTrend={this.fetchTrend.bind(this)} trends={this.state.trends}/>;

    return (
        <SideMenu menu={menu}>
          <StatusBar hidden= {true} />
          <TrendBar selectedTrend={this.state.selectedTrend} />
          <ScrollView style={styles.container}>
            <PieChart fbData={this.state.fbData} />
            <PopTweets popTweets={this.state.popTweets} selectedTrend={this.state.selectedTrend}/>
            <PopHeadlines headlines={this.state.headlines} />
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
  container: {
    backgroundColor: 'white'
  }
});
