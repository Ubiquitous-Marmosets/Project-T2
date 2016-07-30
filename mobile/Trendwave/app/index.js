import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, StatusBar} from 'react-native';
import SideMenu from 'react-native-side-menu';

import PieChart from './components/PieChart';
import PopTweets from './components/PopTweets';
import PopHeadlines from './components/PopHeadlines';
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
      fbData: [[0, 1]],
      headlines: {
        topHeadline: 'No Data',
        secondHeadline: 'Select a trend from the side menu'
      },
      barChartData: {
        ready: false,
        positive: 50,
        negative: 50,
        sentiment: ''
      }
    };
  }

  componentWillMount() {
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
    fetch('http://localhost:3000/grabTweets', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: trend })
    })
    .then(res => res.json())
    .then(data => {


      var positiveScore = Math.floor(data.positive * 100);
      var negativeScore = Math.floor(data.negative * 100);

      console.log('11111111111', positiveScore);

      if ((positiveScore + negativeScore) !== 100) {
        positiveScore += 1;
      }

      this.setState({ barChartData: {
        sentiment: data.summary,
        positive: positiveScore,
        negative: negativeScore,
        ready: true
      }});
    })
    .catch(err => console.log('GrabTweets error: ', err))
    .then(() => {
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
            fbData: [
              [0, res.loves],
              [1, res.wows],
              [2, res.hahas],
              [3, res.sads],
              [4, res.angrys]
            ]
          })
        )
        .catch(err => console.log('Grab Fbook Error:', err)); 
      });
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
            <Sentiment data={this.state.barChartData} />
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
