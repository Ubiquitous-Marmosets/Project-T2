import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class TrendScore extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TREND</Text>
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
    paddingTop: 20,
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
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderRadius: 5
  },
  content: {
    margin: 10,
    textAlign: 'center'
  }
});
