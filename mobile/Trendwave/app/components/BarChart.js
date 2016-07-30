import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Spin from './Spinner';

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      positive: 50,
      negative: 50,
      sentiment: ''
    }
  }

  componentWillMount() {

    fetch('http://localhost:3000/grabTweets', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: this.props.query })
    })
    .then(res => res.json())
    .then(data => {

      var positiveScore = Math.floor(data.positive * 100);
      var negativeScore = Math.floor(data.negative * 100);

      if ((positiveScore + negativeScore) !== 100) {
        positiveScore += 1;
      }

      this.setState({
        sentiment: data.summary,
        positive: positiveScore,
        negative: negativeScore,
        ready: true
      })
    });
  }

  render() {

    return (

      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SENTIMENT ANALYSIS:</Text>
          <Text style={styles.headerTitle}>{this.state.sentiment.toUpperCase() || ''}</Text>
        </View>
        <View>
          <View style={{flex: 1}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {this.state.ready &&
                <View style={{flex: this.state.positive, backgroundColor: '#005A31', justifyContent: 'center', alignItems: 'center', height: 33}}>
                  <Text style={styles.box}> {this.state.positive}%</Text>
                </View>
              }
              {this.state.ready &&
                <View style={{flex: this.state.negative, backgroundColor: '#B71427', justifyContent: 'center', alignItems: 'center', height: 33}}>
                  <Text style={styles.box}> {this.state.negative}%</Text>
                </View>
              }
              {!this.state.ready && <Spin />}
            </View>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#33ccff',
    paddingTop: 30,
    paddingBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#33ccff',
  },
  content: {
    fontSize: 10,
    flex: 1,
    margin: 10,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    fontSize: 15,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BarChart;
