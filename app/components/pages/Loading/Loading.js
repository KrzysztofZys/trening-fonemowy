import * as React from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import stylesPage from './Loading.style';

export default function Loading({ navigation }) {
    setTimeout(() => {
        navigation.navigate('Home');
    }, 5000);

    return (
        <View style={stylesPage.container}>
            <ImageBackground source={require('../../../assets/backgrounds/Loading.png')} resizeMode="cover" style={stylesPage.backimage}>
                <Text style={stylesPage.text}>TRENING SŁUCHU FONEMOWEGO</Text>
                <Image style={stylesPage.image} source={require('../../../assets/logo.png')}></Image>
            </ImageBackground>
        </View>
    );
}