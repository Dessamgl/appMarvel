import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, FlatList, Text, Image, Action } from 'react-native'
import { Header} from "react-native-elements";
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import md5 from 'js-md5'
import { TextInput } from 'react-native-gesture-handler';

const PUBLIC_KEY = '2f2331c74c430b98e884e694b0c722cc'
const PRIVATE_KEY = 'a951417c6542664dda96ea1f031cd75a50b3c3c7'

export function homeConfig({navigation}) {
    return {
        header: null
    }
}
function ListHeroes({ navigation }) {
    Font.loadAsync({
        'barlow-black': require('../../assets/fonts/Barlow-Black.ttf'),
        'barlow-condensed': require('../../assets/fonts/BarlowCondensed-Black.ttf')
      })
    const [data, setData] = useState([]);
    const [active, setActive] = useState(false);
    
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
                <Text style={{marginLeft: 10, color: "#ffffff", fontFamily: 'barlow-condensed', fontStyle: "normal", fontWeight: "normal", fontSize: 16, lineHeight: 19}}>{item.name}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={35} color="#F0141E" style={{
                    position: "absolute",
                    height: 50,
                    left: 340,
                    top: 20,
                    mixBlendMode: "normal"
                }}></MaterialIcons>
            </TouchableOpacity>
        )
    }
    
    if(!active){
        return (
            <>
            <Header
                backgroundColor={'#B50F16'}
                leftComponent={{
                    style: {color: '#fff', fontSize: 15, fontFamily: 'barlow-black' },
                    text: "Characters"
                }}
                rightComponent={
                    <TouchableOpacity>
                        <MaterialIcons name="search" size={25} color="#ffffff" style={{
                            height: 20
                        }} onPress={()=> {
                            navigation.navigate('infoHeroes', {hero: item})
                        }}>
                        </MaterialIcons>
                    </TouchableOpacity> 
                }
            />
            </>
        )
    } else {
        return (
            <>
            <Header
            backgroundColor={'#B50F16'}
                rightComponent={ 
                    <TouchableOpacity
                    onPress={()=> {
                        setActive(false);
                    }}>
                        <MaterialIcons name="close" size={25} color="#ffffff" style={{
                            height: 20
                        }} >
                        </MaterialIcons>
                    </TouchableOpacity> 
                }
                centerComponent={
                    <View>
                        <TextInput
                            placeholder="Name of character"
                            placeholderTextColor="#999"
                            autoCapitalize="words"
                            autoCorrect={false}
                        >
                        </TextInput>
                    </View>
                }
                leftComponent={ 
                    <TouchableOpacity>
                        <MaterialIcons name="arrowleft" size={25} color="#ffffff" style={{
                            height: 20
                        }} onPress={()=> {
                            setActive(true);
                            navigation.goBack()
                        }}>
                        </MaterialIcons>
                    </TouchableOpacity> 
                }
            />
            </>
        )
      }
            
            return (
            <FlatList style={{ backgroundColor: '#303030'}}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={()=>
                <View style={{height:1, backgroundColor: '#000000'}} 
                />}
            />
    )
}

export default ListHeroes;