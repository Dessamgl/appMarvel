import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, FlatList, Text, Image } from 'react-native'
import md5 from 'js-md5'

const PUBLIC_KEY = '2f2331c74c430b98e884e694b0c722cc'
const PRIVATE_KEY = 'a951417c6542664dda96ea1f031cd75a50b3c3c7'

// const [onItemPress, setOnItemPress] = useState([]);

function ListHeroes({ navigation }) {
    const [data, setData] = useState([])
    
    state = {
        data: []
    }

     async function initialLoad()  {
        const timestamp = Number(new Date())
        const hash = md5.create()
        hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
        const responseJson = await response.json()
        setData(responseJson.data.results)
    }

    useEffect(() => {
        initialLoad();
    }, []);

    renderItem = ({item}) => {
        return  (
            <TouchableOpacity onPress={()=> {
                navigation.navigate('infoHeroes', {hero: item})
            }} style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                <Image style={{height: 50, width: 50, borderRadius: 25}} source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
                <Text style={{marginLeft: 10}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    // onItemPress = (item) => {
    //     navigation.navigate('infoHeroes', {hero: item})
    // } 

        return (
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={()=>
                    <View style={{height:1, backgroundColor: '#f7f7f7'}} 
                />}
            />
        )
}

export default ListHeroes;