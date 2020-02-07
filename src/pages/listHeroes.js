import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, FlatList, Text, Image } from 'react-native'
import { Header} from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import md5 from 'js-md5'

const PUBLIC_KEY = '2f2331c74c430b98e884e694b0c722cc'
const PRIVATE_KEY = 'a951417c6542664dda96ea1f031cd75a50b3c3c7'

export function homeConfig({navigation}) {
    return {
        header: null
    }
}

function ListHeroes({ navigation }) {
    const [data, setData] = useState([]);
    const [fontIsLoaded, setFontIsLoaded] = useState(false);
    
    useEffect(() => {
        Font.loadAsync({
            'barlow-black': require('../../assets/fonts/Barlow-Black.ttf'),
            'barlow-condensed': require('../../assets/fonts/BarlowCondensed-Black.ttf')
          }).then(() => {
            setFontIsLoaded(true);
          })
      }, [])
 
    
    state = {
        data: []
    }

     async function initialLoad()  {
        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        const response = await fetch(
            `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
        const responseJson = await response.json()
        setData(responseJson.data.results)
    }

    useEffect(() => {
        initialLoad();
    }, []);

    renderItem = ({item}) => {
        return  (
            <TouchableOpacity 
            onPress={()=> {
                navigation.navigate('infoHeroes', {hero: item})
            }} 
            style={{flexDirection:'row', padding: 10, alignItems:'center'}}>

                <Image 
                    style={{height: 50, width: 50, borderRadius: 25}} 
                    source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} 
                />
                <Text 
                    style={{
                        marginLeft: 10, 
                        color: "#ffffff", 
                        fontFamily: 'barlow-condensed', 
                        fontStyle: "normal", 
                        fontWeight: "normal", 
                        fontSize: 16, 
                        lineHeight: 19
                    }}>
                        {item.name}
                </Text>

                <MaterialIcons 
                    name="keyboard-arrow-right" 
                    size={35} 
                    color="#F0141E" 
                    style={{
                        position: "absolute",
                        height: 50,
                        left: 340,
                        top: 20,
                        mixBlendMode: "normal"
                    }}>

                </MaterialIcons>
            </TouchableOpacity>
        )
    }
    
        return (
            <>
            <Header
                backgroundColor={'#B50F16'}
                leftComponent={{
                    style: {color: '#fff', fontSisze: 15, fontFamily: fontIsLoaded ? 'barlow-black' : 'normal' },
                    text: "Characters"
                }}
                rightComponent={
                    <TouchableOpacity  
                    onPress={()=> {}}>

                        <MaterialIcons 
                        name="search" 
                        size={25} 
                        color="#ffffff" 
                        style={{
                            height: 20
                        }}>

                        </MaterialIcons>
                    </TouchableOpacity> 
                }
            />

            <FlatList 
                style={{ backgroundColor: '#303030'}}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={()=>
                <View style={{height:1, backgroundColor: '#000000'}} 
                />}
            />
            </>
        )
}

export default ListHeroes;