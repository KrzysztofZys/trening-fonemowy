import * as React from 'react';
import { Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import stylesPage from './Home.style';

export default function Home({ navigation }) {
    return (
        <View style={stylesPage.container}>
            <ImageBackground source={require('../../../assets/backgrounds/Home.png')} resizeMode="cover" style={stylesPage.backimage}>
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