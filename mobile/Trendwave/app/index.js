import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PieChart from './components/PieChart.ios.js';

// Here we can use import statesments using the
// naming convention component.ios.js and component.android.js

// import Component from  './components/component' }

export default class Trendwave extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>TrendWave</Text>
        <PieChart />
        {/*<Component>*/}
        {/*<Component>*/}
        {/*<Component>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
