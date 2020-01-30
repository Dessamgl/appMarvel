import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image, Dimensions, Text } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width

function infoHeroes({ navigation }) {

        const { hero } = navigation.state.params
        return (
           <ScrollView persistentScrollbar={true}  style={{backgroundColor: '#303030',}}>
               <Image 
                    source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
                    style={styles.image}
                />
                <Text style={styles.name}>{hero.name || "Nome do Personagem"}</Text>
                <Text style={styles.description}>{hero.description || 
                "Our writer is busy saving the Semantics World, so this character doesn't have a description yet!"}
                </Text>
           </ScrollView> 
        )

    }
    const styles = StyleSheet.create({
        image: {
            // position: "absolute",
            borderRadius: 75,
            width: 157,
            height: 157,
            left: 102,
            top: 46,
        },
        name: {
            // position: "absolute",
            // width: 58,
            // height: 24,
            // left: 151,
            // top: 65,
            textAlign: "center",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize:20,
            lineHeight: 24,
            color: "#FFFFFF", 
        },
        description: {
            // fontFamily: Barlow,
            // position: "absolute",
            // width: 324,
            // height: 30,
            // left: 18,
            // top: 90,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 16,
            lineHeight: 19,
            color: "#FFFFFF"
        }
    })

export default infoHeroes;