import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

//var Spinner = require('react-native-spinkit');

import Spin from './Spinner';

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      positive: 20,
      negative: 80
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
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text> {this.state.sentiment} </Text>
        </View>
        <View style={{flex: 2, flexDirection: 'row'}}>
          {this.state.ready && <View style={{flex: this.state.positive, backgroundColor: '#005A31', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.box}> {this.state.positive}</Text>
                               </View>
          }
          {this.state.ready && <View style={{flex: this.state.negative, backgroundColor: '#B71427', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.box}> {this.state.negative}</Text>
                               </View>
          }
          {!this.state.ready && <Spin />}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    fontSize: 25,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BarChart;
