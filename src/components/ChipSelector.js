import React,{Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';

import chips from '../data/chips';


class ChipSelector extends Component{

    render(){
        return(
            <View style={styles.chipsBorder}>
                <ScrollView 
                    horizontal={true}
                    contentContainerStyle={styles.scrollable}
                    showsHorizontalScrollIndicator={false}
                >
                    {chips && chips.length > 0 && chips.map((chip,_index) => (
                        <TouchableOpacity 
                            key={_index}
                            onPress={() => this.props.onSelect(chip.value)}
                        >
                            <View style={
                                _index < (chips.length-1) ? styles.chipsMargin : {}
                            }>
                                <Text>{chip.value}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    chipsBorder : {
        borderTopWidth : 2,
        borderBottomWidth : 2,
    },
    scrollable:{
        padding : 8
    },
    chipsMargin: {
        marginRight : 20
    },
    chipSize : {
        width : 45, 
        height: 45
    }
})

export default ChipSelector;