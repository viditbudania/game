import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import backCard from '../assets/cards/back.png';
const {width} = Dimensions.get("window");
const CARD_WIDTH = (width / 3) - 50;
const CARD_HEIGHT = (width / 3) + 5;
const CARD_SEPARATION = 50;

class CardDeck extends Component{
    render(){
        const {cards, isDealer, gameover} = this.props
        return(
            <View>
                <View> 
                    {cards && cards.length > 0 && cards.map((card,i) => {
                        return (
                        <View
                            key={i}
                            style={[
                            i > 0 ? {
                                position : "absolute",
                                left : (i * CARD_SEPARATION),
                            } : {},
                            {
                                //elevation : 2,
                                borderWidth : 1,
                                borderColor : "black",
                                borderRadius : 6
                            }]}
                        ><Image 
                            source={ (isDealer && i == 0 && !gameover) ? backCard : cards[i].image}
                            style={{
                                width : CARD_WIDTH,
                                height : CARD_HEIGHT,
                            }}
                        /></View>)
                    })}
                </View>
            </View>
        )
    }
}



export default CardDeck;