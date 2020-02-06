import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, Dimensions, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function infoHeroes({ navigation }) {

    const { hero } = navigation.state.params

    const [active, setActive] = useState(false);

    
    if(active){
        styles.description = {height: 500, width: 380,
            textAlign: "center",
            padding: 40,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 16,
            lineHeight: 19,
            color: "#FFFFFF"}
    } else {
        styles.description = {height: 150,  width: 380,
            textAlign: "center",
            padding: 40,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 16,
            lineHeight: 19,
            color: "#FFFFFF"}
        }


    return (
        <ScrollView persistentScrollbar={true}  style={{backgroundColor: '#303030',}}>
            <Image 
                source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
                style={styles.image}
            />
            <Text 
            style={styles.name}>{hero.name || "Nome do Personagem"}
            </Text>

            <Text 
            style={styles.description}>{hero.description || 
            "Our writer is busy saving the Semantics World, so this character doesn't have a description yet!"}
            </Text>
            <MaterialIcons 
                        style={styles.icon}
                        onPress={()=> {
                         setActive(true)
                        }}
                        name="down" 
                        size={25} 
                        color="#ffffff" 
            >

            </MaterialIcons>
        </ScrollView> 
    )

}

    const styles = StyleSheet.create({
        image: {
            borderRadius: 80,
            width: 157,
            height: 157,
            left: 102,
            top: 20,
        },
        name: {
            width: 380,
            top: 35,
            textAlign: "center",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize:20,
            lineHeight: 24,
            color: "#FFFFFF", 
        },
        // description: {
        // //    height:150,
        //     width: 380,
        //     textAlign: "center",
        //     padding: 40,
        //     fontStyle: "normal",
        //     fontWeight: "normal",
        //     fontSize: 16,
        //     lineHeight: 19,
        //     color: "#FFFFFF"
        // }
        icon:{
            color:"#F0141E", 
            textAlign: "center",
            // height: 20
            width: 380
        }
    })

export default infoHeroes;