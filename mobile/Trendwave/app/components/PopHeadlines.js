import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class PopHeadlines extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MOST POPULAR HEADLINES</Text>
        </View>
        <View>
          <Text style={styles.content}>{this.props.topHeadline}</Text>
          <Text style={styles.content}>{this.props.secondHeadline}</Text>
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
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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
