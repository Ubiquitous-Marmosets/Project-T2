import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class TrendBar extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.content}>{this.props.selectedTrend}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#d7d5d5',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  content: {
    fontFamily: 'Avenir',
    flexDirection: 'row',
    textAlign: 'center',

  }
});

