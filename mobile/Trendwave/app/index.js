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

export default class Trendwave extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popTweets: [],
      popHeadlines: []
    };
  }

  componentWillMount(){
    fetch('http://localhost:3000/trends')
    .then(response => response.json())
    .then(res => {
      this.setState({trends:res});
    });
  }

  render() {
    const menu = <Menu trends={this.state.trends}/>;

    return (
        <SideMenu menu={menu}>
        <StatusBar hidden= 'true' />
          <ScrollView style={styles.container}>
            <PieChart styles={styles.chart} />
            <PopTweets popTweets={this.state.popTweets}/>
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
