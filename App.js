import React,{Component} from 'react';
import { 
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Text,
  Alert
} from 'react-native';
import cardsDeck from './src/data/cards';
import {shuffle} from './src/helpers';
import {ChipSelector, UserControls} from './src/components';

class App extends Component{

  constructor(){
    super();

    this.state = {
      totalBet : 0,
      amount : 5000,
      playerHand : [],
      dealerHand : [],
      gameover : false,
      cardCount : 0,
      gameMessage : "",
    }
  }

  componentDidMount(){
    this.newGame();
  }

  render(){
    return(
      <View 
        style={styles.container}>

        <StatusBar backgroundColor={"green"} translucent={true} />

        <View style={styles.bottom}>

          <UserControls 
            playerHand={this.state.playerHand}
            dealerHand={this.state.dealerHand}
            newGame={() => this.newGame()}
            hit={() => this.hit()}
            endgame={() => this.endgame()}
            gameover={this.state.gameover}
            totalBet={this.state.totalBet}
          />

          <View style={styles.center}>
            
            <Text>{`Total Bet $ ${this.state.totalBet}`}</Text>
          </View>
          <ChipSelector 
            onSelect={(chipValue) => {
              if(!this.state.gameover){
                if(chipValue <= this.state.amount){
                  this.setState({
                    totalBet : (this.state.totalBet + chipValue),
                    amount : (this.state.amount - chipValue)
                  })
                }
              }else{
                if(this.state.amount > 0){
                  this.newGame();
                  this.setState({
                    totalBet : (this.state.totalBet + chipValue),
                    amount : (this.state.amount - chipValue)
                  })
                }
              }
            }}
          />
          <View style={styles.center}>
           
            <Text>{`Available $ ${this.state.amount}`}</Text>
          </View>

          {this.state.gameover && this.state.gameMessage != "" ? 
          Alert.alert(
            `${this.state.gameMessage}`,
            "",
            [
              {
                text: "CONTINUE",
                onPress: () => this.newGame(),
                // style: "cancel"
              }
            ],
            { cancelable: false }
          )
          : undefined}

        </View>
      </View>
    )
  }

  newGame(){
    let cardCount = 0;
    shuffle(cardsDeck);
    
    let playerHand = [],
    dealerHand = [];

    for(let i = 0; i < 2; i++){
      playerHand.push(cardsDeck[cardCount]);
      cardCount++;
      dealerHand.push(cardsDeck[cardCount]);
      cardCount++;
    }

    this.setState({
      playerHand,
      dealerHand,
      gameover:false,
      cardCount,
      gameMessage : ""
    });
  }

  hit(){

      this.state.playerHand.push(cardsDeck[this.state.cardCount]);

      let userPoints = this.checkTotalPlayerPoints(this.state.playerHand);

      this.setState({
        playerHand,
        cardCount : (this.state.cardCount + 1)
      });

      if(userPoints > 21){
        this.endgame();
        return;
      }
  }


  endgame(){
    const {playerHand, dealerHand, cardCount, totalBet, amount} = this.state;

    let _cardCount = cardCount;

    let dealerPoints = this.checkTotalPlayerPoints(dealerHand),
    playerPoints = this.checkTotalPlayerPoints(playerHand);
    //alert(dealerPoints)
    while(dealerPoints < 17){
      dealerHand.push(cardsDeck[_cardCount]);
      _cardCount++;
      dealerPoints = this.checkTotalPlayerPoints(dealerHand);
    }

    let betValue = totalBet * 1.5;

    //who won
    if(playerPoints == 21 && playerHand.length == 2){
      //multiplicar su apuesta x 1.5
      let newAmount = totalBet * 1.5;
      this.setState({
        amount : newAmount,
        totalBet : 0,
        gameover : true,
        gameMessage : "Player BlackJack!"
      });
    }

    if(
      (playerPoints < 22 && dealerPoints < playerPoints) || 
      (dealerPoints > 21 && playerPoints < 22)
    ){
      this.setState({
        amount : (amount + betValue),
        totalBet : 0,
        gameover : true,
        gameMessage : "You Win $ "+ betValue
      });
    }else if(dealerPoints > 21 && playerPoints < 22){
      this.setState({
        amount : (amount + betValue),
        totalBet : 0,
        gameover : true,
        gameMessage : "You Win $ "+ betValue
      });
    }
    else if(playerPoints > 21 && dealerPoints <= 21){
      this.setState({
        dealerHand,
        cardCount : _cardCount,
        gameover : true,
        totalBet : 0,
        gameMessage : "Bust!"
      });
    }else if(playerPoints == dealerPoints){
      this.setState({
        totalBet : 0,
        amount : (amount + totalBet),
        gameover : true,
        gameMessage : "Push!"
      });
    }else{
      this.setState({
        totalBet : 0,
        gameover : true,
        gameMessage : "Dealer Wins, You Lost"
      });
    }
  }


  checkTotalPlayerPoints(playerHand){
    let aceAdjuts = false,
    points = 0;

    playerHand.map((card,_index) => {
      if(card.name == 'A' && !aceAdjuts) {
        aceAdjuts = true;
        points = points + 10;
      }
      points = points + card.value;
    });

    if(aceAdjuts && points > 21){
      points = points - 10;
    }

    return points;
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1
  },
  center : {
    alignItems : "center"
  },

  bottom : {
    position : "absolute",
    left : 0,
    right : 0,
    bottom : 0,
    zIndex : 2
  }
});

export default App;