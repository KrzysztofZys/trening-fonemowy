import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import stylesPage from './Info.style';

export default function Info({ navigation }) {

    // const { level, data } = route.params;

    return (
        <View style={stylesPage.container}>
            {/* <Text style={stylesPage.mainText}>INFO</Text>
            <Text style={stylesPage.content}>Poziom ćwiczenia: {excersise.levels[level]}</Text>
            <Text style={stylesPage.content}>Opis:</Text>
            <Text style={stylesPage.content}>{excersise.description}</Text>
            <TouchableOpacity key={index}
                style={ stylesPage.button }
                onPress={() => navigation.navigate('Levels', { data })}
            >
                <Text style={stylesPage.buttonText}>Dalej</Text>
            </TouchableOpacity> */}
        </View>
    );
}