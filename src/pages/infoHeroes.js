import React, { Component } from 'react';
import { ScrollView, Image, Dimensions, Text } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width

function infoHeroes() {

        const { hero } = props.navigation.state.params
        return (
           <ScrollView>
               <Image 
                    source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
                    style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}}
                />
                <Text style={{padding:10, fontSize:20}}>{hero.name}</Text>
                <Text style={{padding:10}}>{hero.description}</Text>
           </ScrollView> 
        )
}

export default infoHeroes;