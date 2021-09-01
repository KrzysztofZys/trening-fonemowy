import * as React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import stylesPage from './None.style';

export default function None({ navigation }) {
    return (
        <View style={stylesPage.container}>
            <Text style={stylesPage.text}>This screen does not exist</Text>
            <TouchableOpacity 
            style={[stylesPage.button, stylesPage.borderRed]}
            onPress={() => navigation.navigate('Home')}
            >
                <Text style={stylesPage.text}>Go Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
}