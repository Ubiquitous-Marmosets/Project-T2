import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PopTweets extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MOST POPULAR TWEETS</Text>
        </View>
        <View>
          <Text style={styles.content}>Content Goes Here</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  header: {
    backgroundColor: '#33ccff',
    paddingTop: 30,
    paddingBottom: 10,
    // width: 300
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    // flex: 1
  },
  mainContainer: {
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#33ccff',
    flex: 1
  },
  content: {
    margin: 10,
    textAlign: 'center'
  }
});
