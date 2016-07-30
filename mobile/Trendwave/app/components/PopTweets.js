import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';
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
      secondTweet: '',
      query: 'Stephen Curry'
    };
  }

  componentDidMount() {

    fetch('http://localhost:3000/grabTopTweet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: this.state.query})
    }).then(res => res.json())
    .then(response => {
      let firstTweet = `${response.firstUser}: ${response.firstTweet} \n ${moment(response.firstTweetTime).fromNow()}`;
      let secondTweet = `${response.secondUser}: ${response.secondTweet} \n ${moment(response.secondTweetTime).fromNow()}`;
      this.setState({
        firstTweet: firstTweet,
        secondTweet: secondTweet
      });
    })
    .then(() => {

      console.log('State Poptweets:', this.state);
    })
    .catch(response => console.log('Top Tweet Grab Error:', response));

   
    console.log('PopTweets props: ', this.props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MOST POPULAR TWEETS</Text>
      </View>
        <Text style={styles.content}>{this.state.firstTweet}</Text>
        <Text style={styles.content}>{this.state.secondTweet}</Text>
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
    marginRight: 10
  },
  content: {
    fontSize: 10,
    flex: 1,
    margin: 10,
    textAlign: 'center',
    paddingBottom: 10,
  },
  // contentWrapper: {
  //   flex: 1
  // }
});


/*

{this.props.popTweets.firstUser}: {this.props.popTweets.firstTweet} {this.props.popTweets.firstTweetTime}

*/
