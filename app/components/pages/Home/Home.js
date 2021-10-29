import { useEffect } from 'react';
import * as React from 'react';
import { useIsFocused } from "@react-navigation/native";
import { Text, View, TouchableOpacity, ImageBackground, Dimensions, BackHandler, Alert } from 'react-native';
import stylesPage from './Home.style';

export default function Home({ navigation }) {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const isFocused = useIsFocused();
    let backSource = require('../../../assets/backgrounds/Home.png');
    if ((windowHeight / windowWidth) < 1.7) backSource = require('../../../assets/backgrounds/HomeB.png')

    useEffect(() => {
        const onBackPress = () => {
            if(isFocused) {
                Alert.alert("Czekaj!", "Na pewno chcesz wyłączyć aplikację?", [
                    {
                        text: "Nie",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Tak", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            } else return false;
            
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isFocused])


    return (
        <View style={stylesPage.container}>
            <ImageBackground source={backSource} resizeMode="cover" style={stylesPage.backimage}>
                <TouchableOpacity
                    style={[stylesPage.button, stylesPage.borderPurple]}
                    onPress={() => navigation.navigate('Trainings')}
                >
                    <Text style={stylesPage.text}>ćwiczenia</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[stylesPage.button, stylesPage.borderYellow]}
                    onPress={() => navigation.navigate('Tests')}
                >
                    <Text style={stylesPage.text}>testy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[stylesPage.button, stylesPage.borderRed]}
                    onPress={() => navigation.navigate('Results')}
                >
                    <Text style={stylesPage.text}>statystyki</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}