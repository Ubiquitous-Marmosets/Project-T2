import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export default class Menu extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {this.props.trends.map(item => <View style={styles.contentView}><Text style={styles.content}>{item.toUpperCase()}</Text></View>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#33ccff',
    flex: 1
  },
  contentView:{
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  content: {
    padding: 5,
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    color: 'white',
    margin: 5
  }
});