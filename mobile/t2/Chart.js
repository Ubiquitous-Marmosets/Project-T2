import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

//import React, { StyleSheet, View, Component } from 'react-native';
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
  Rubi Marms:
  The X coordinate indicates only a new data point:
  [ [0, 1], [1, 1], [2, 1]] === [ [0, 1], [0, 1], [100, 1]]
  In terms of pie charts at least.
  The Y Coordinate indicates the amount portioned to that segment.
  Therefore, the above example is a three slice pie chart of equal portions.
*/

const data = [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
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
