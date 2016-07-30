import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// import Spin from './Spinner.js';

class BarChart extends React.Component {

  render() {

    return (
      <View>
        {/*
          <Text style={styles.headerTitle}>{this.state.sentiment.toUpperCase() || ''}</Text>
        */}
          <View style={{flex: 1, flexDirection: 'row'}}>
            {this.props.data.ready &&
              <View style={{flex: this.props.data.positive, backgroundColor: '#005A31', justifyContent: 'center', alignItems: 'center', height: 45}}>
                <Text style={styles.box}> {this.props.data.positive}%</Text>
              </View>
            }
            {this.props.data.ready &&
              <View style={{flex: this.props.data.negative, backgroundColor: '#B71427', justifyContent: 'center', alignItems: 'center', height: 45}}>
                <Text style={styles.box}> {this.props.data.negative}%</Text>
              </View>
            }
            {!this.props.data.ready && <Text> Calculating Results.. </Text>}
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
