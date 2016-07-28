/*

  Ubi Marms: How to install this component

  Open XCode:
    Load new project:
      mobile/trendwave/ios/xcodefile

    Installation of library:
      Show the project tree in Trendwave
      Right click Libraries and click 'add files to Trendwave'
      /Trendwave/node_modules/react-native/Libraries/ART/ART.xcodeproj


    Click on the root most Trendwave in the project tree
    Select Build Phases from the menu in the center
    From the dropdown select Link Binary with Libraries
    Click the + to add a new one
    Choose libART.a (one of the first ones at the top)

    recompile: react-native run-ios

    Then you got pie charts, man =)
*/


import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Chart from 'react-native-chart';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
        width: 250,
        height: 200,
    },
});

/*
  Ubi Marms: How to use this component
  The X coordinate indicates only a new data point:
  [ [0, 1], [1, 1], [2, 1]] === [ [0, 1], [0, 1], [100, 1]]
  In terms of pie charts at least.
  The Y Coordinate indicates the amount portioned to that segment.
  Therefore, the above example is a three slice pie chart of equal portions.
*/

const data = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
];

class SimpleChart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Chart
                    style={styles.chart}
                    data={data}
                    type="pie"
                    showAxis={false}
                 />
            </View>
        );
    }
}

export default SimpleChart;
