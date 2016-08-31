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
        <Text style={styles.loves}>Loves</Text>
        <Text style={styles.wows}>Wows</Text>
        <Text style={styles.hahas}>Hahas</Text>
        <Text style={styles.sads}>Sads</Text>
        <Text style={styles.angries}>Angries</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  loves: {
    backgroundColor: '#fb5955',
    width: 60,
    borderRadius: 3,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 11,
    fontFamily: 'Avenir'
  },
  wows: {
    backgroundColor: '#fdd400',
    width: 60,
    borderRadius: 3,
    textAlign: 'center',
    marginRight: 11,
    fontFamily: 'Avenir'
  },
  hahas: {
    backgroundColor: '#94c63e',
    width: 60,
    borderRadius: 3,
    textAlign: 'center',
    marginRight: 12,
    fontFamily: 'Avenir'
  },
  sads: {
    backgroundColor: '#999999',
    width: 60,
    borderRadius: 3,
    textAlign: 'center',
    marginRight: 12,
    fontFamily: 'Avenir'
  },
  angries: {
    backgroundColor: '#beb06f',
    width: 60,
    borderRadius: 3,
    textAlign: 'center',
    marginRight: 12,
    fontFamily: 'Avenir'
  },
  mainContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    justifyContent: 'center'
  }
});
