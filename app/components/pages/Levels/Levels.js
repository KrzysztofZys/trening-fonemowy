import * as React from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import stylesPage from './Levels.style';

export default function Levels({ route, navigation }) {

    const { excersise } = route.params;
    const excersiseInfo = excersise;

    if (excersise === undefined) return <Text>No data</Text>

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    let backSource = require('../../../assets/backgrounds/Excersises.png');
    if ((windowHeight / windowWidth) < 1.7) backSource = require('../../../assets/backgrounds/ExcersisesB.png')

    return (
        <View style={stylesPage.container}>
            <ImageBackground source={backSource} resizeMode="cover" style={stylesPage.backimage}>
                {
                    excersise.levels.map((name, indexInfo) =>
                        <TouchableOpacity key={indexInfo}
                            style={[
                                stylesPage.button,
                                indexInfo % 3 === 0 ? stylesPage.borderYellow : null,
                                indexInfo % 3 === 1 ? stylesPage.borderPurple : null,
                                indexInfo % 3 === 2 ? stylesPage.borderRed : null
                            ]}
                            onPress={() => navigation.navigate('Info', { excersiseInfo, indexInfo })}
                        >
                            <Text style={stylesPage.text}>{name}</Text>
                        </TouchableOpacity>
                    )
                }
            </ImageBackground>
        </View>
    );
}