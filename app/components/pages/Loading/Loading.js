import * as React from 'react';
import { Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import stylesPage from './Loading.style';

export default function Loading({ navigation }) {
    setTimeout(() => {
        navigation.navigate('Home');
    }, 5000);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    let backSource = require('../../../assets/backgrounds/Loading.png');
    if ((windowHeight / windowWidth) < 1.7) backSource = require('../../../assets/backgrounds/LoadingB.png')

        return (
            <View style={stylesPage.container}>
                <ImageBackground source={backSource} resizeMode="cover" style={stylesPage.backimage}>
                    <Text style={stylesPage.text}>TRENING SŁUCHU FONEMOWEGO</Text>
                    <Image style={stylesPage.image} source={require('../../../assets/logo.png')}></Image>
                </ImageBackground>
            </View>
        );
}