import * as React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import stylesPage from './Levels.style';

export default function Levels({ route, navigation }) {

    const { excersise } = route.params;

    if (excersise === undefined) return <Text>No data</Text>

    return (
        <View style={stylesPage.container}>
            <ImageBackground source={require('../../../assets/backgrounds/Excersises.png')} resizeMode="cover" style={stylesPage.backimage}>
                {
                    excersise.levels.map((name, index) =>
                        <TouchableOpacity key={index}
                            style={[
                                stylesPage.button,
                                index%3 === 0 ? stylesPage.borderYellow : null,
                                index%3 === 1 ? stylesPage.borderPurple : null,
                                index%3 === 2 ? stylesPage.borderRed : null
                            ]}
                            onPress={() => navigation.navigate('Info')}
                        >
                            <Text style={stylesPage.text}>{name}</Text>
                        </TouchableOpacity>
                    )
                }
            </ImageBackground>
        </View>
    );
}