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
    paddingTop: 20,
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1
  },
  content: {
    margin: 10,
    textAlign: 'center'
  }
});
