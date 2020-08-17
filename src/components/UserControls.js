import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {calculatePoints} from '../helpers';
import {CardDeck} from '../components';

class UserControls extends Component {
  constructor() {
    super();

    this.state = {
      playerPoints: 0,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.playerHand) {
      this.setState({
        playerPoints: calculatePoints(nextProps.playerHand),
        dealerPoints: calculatePoints(nextProps.dealerHand),
      });
    }
  }

  render() {
    const {
      playerHand,
      dealerHand,
      newGame,
      hit,
      endgame,
      gameover,
      totalBet,
    } = this.props;

    return (
      <View style={styles.centerView}>
        <View style = {styles.buttonView}>
          {totalBet == false && (
            <TouchableOpacity
              onPress={() => {
                newGame();
              }}>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>{'NEW CARDS'}</Text>
              </View>
            </TouchableOpacity>
          )}

          {!!totalBet && (
            <TouchableOpacity
              onPress={() => {
                hit();
              }}>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>{'HIT'}</Text>
              </View>
            </TouchableOpacity>
          )}

          {!!totalBet && (
            <TouchableOpacity
              onPress={() => {
                endgame();
              }}>
              <View style={styles.buttonStyle}>
                <Text style={styles.textStyle}>{'DEAL'}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <CardDeck cards={dealerHand} isDealer={true} gameover={gameover} />
          <CardDeck cards={playerHand} />
        </View>

        <View style={styles.center}>
          <Text>{this.state.playerPoints}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerView: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  betText: {
    color: 'white',
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
  },
  buttonView: {
    flexDirection: 'column'
  },
  buttonStyle: {
    padding : 10,
    borderWidth : 2,
    alignItems : 'center'
  },
  textStyle: {
    color: 'black',
  },
});

export default UserControls;
