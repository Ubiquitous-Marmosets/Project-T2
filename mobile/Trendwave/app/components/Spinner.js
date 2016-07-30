var React = require('react');
var ReactNative = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} = ReactNative;

var Spinner = require('react-native-spinkit');

var Example = React.createClass({

  getInitialState() {
    return {
      index: 0,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 60,
      color: "#D9853B",
    }
  },

  increaseSize() {
    this.setState({size: this.state.size + 10});
  },

  changeColor() {
    this.setState({color: '#'+Math.floor(Math.random()*16777215).toString(16)});
  },

  changeVisibility() {
    this.setState({isVisible: !this.state.isVisible});
  },

  render() {
    var type = this.state.types['this.state.index'];

    return (
      <View style={styles.container}>
        <Spinner
          size={this.state.size}
          type={'ThreeBounce'}
          color={this.state.color}/>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33ccff'
  },
});

export default Example;
