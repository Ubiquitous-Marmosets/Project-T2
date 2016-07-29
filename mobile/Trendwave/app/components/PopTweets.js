import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

/*

{ firstUser: 'sbstryker',
  firstTweet: 'HRC: "I need you to destroy Donald Trump. Absolutely ether him. Say \'malarkey\' too."\n\nJoe: "Say no more fam." https://t.co/aXUWsSZuav',
  firstTweetTime: 20,
  secondUser: 'nytimes',
  secondTweet: 'Breaking News: Donald Trump called on Russia to hack Hillary Clinton\'s email https://t.co/KMP1YUCkJ1 https://t.co/RbLffoyGxQ',
  secondTweetTime: 30
}

*/

export default class PopTweets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstTweet: '',
      secondTweet: ''
    };
  }

  componentWillMount() {
    let tweetObj = this.props.popTweets;
    let firstTweet = `${this.props.popTweets.firstUser}: ${this.props.popTweets.firstTweet} \n ${this.props.popTweets.firstTweetTime}`;
    let secondTweet = `${this.props.popTweets.secondUser}: ${this.props.popTweets.secondTweet} \n ${this.props.popTweets.secondTweetTime}`;

    this.setState({
      firstTweet: firstTweet,
      secondTweet: secondTweet
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MOST POPULAR TWEETS</Text>
        </View>
        <View>
          <Text style={styles.content}>{this.state.firstTweet}</Text>
          <Text style={styles.content}>{this.state.secondTweet}</Text>
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
  },
  content: {
    fontSize: 10,
    flex: 1,
    margin: 10,
    textAlign: 'center'
  }
});


/*

{this.props.popTweets.firstUser}: {this.props.popTweets.firstTweet} {this.props.popTweets.firstTweetTime}

*/
