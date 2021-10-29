import { useEffect } from 'react';
import * as React from 'react';
import { useIsFocused } from "@react-navigation/native";
import { Text, View, TouchableOpacity, ImageBackground, Dimensions, BackHandler } from 'react-native';
import stylesPage from './Levels.style';

export default function Levels({ route, navigation }) {

    const { excersise } = route.params;
    const excersiseInfo = excersise;

    if (excersise === undefined) return <Text>No data</Text>

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const isFocused = useIsFocused();
    let backSource = require('../../../assets/backgrounds/Excersises.png');
    if ((windowHeight / windowWidth) < 1.7) backSource = require('../../../assets/backgrounds/ExcersisesB.png')

    useEffect(() => {
        const onBackPress = () => {
            if(isFocused) {
                navigation.navigate('Trainings')
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