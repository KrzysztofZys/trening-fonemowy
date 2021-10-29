import { useEffect } from 'react';
import * as React from 'react';
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, TouchableOpacity, ImageBackground, Dimensions, BackHandler } from 'react-native';
import stylesPage from './Trainings.style';
import { trainingsService } from '../../../services/trainingsService';

export default function Trainings({ navigation }) {
    const trainings = useSelector((state) => state.trainings);
    const dispatch = useDispatch()

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const isFocused = useIsFocused();
    let backSource = require('../../../assets/backgrounds/Excersises.png');
    if ((windowHeight / windowWidth) < 1.7) backSource = require('../../../assets/backgrounds/ExcersisesB.png')

    useEffect(() => {
        dispatch(trainingsService.fetchExcersise())
    }, [])

    useEffect(() => {
        const onBackPress = () => {
            if(isFocused) {
                navigation.navigate('Home')
                return true;
            } else return false;
            
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isFocused])

    if (trainings.length < 0) return <Text>Loadings</Text>

    return (
        <View style={stylesPage.container}>
            <ImageBackground source={backSource} resizeMode="cover" style={stylesPage.backimage}>
                {
                    trainings.map((excersise, index) =>
                        <TouchableOpacity key={index}
                            style={[
                                stylesPage.button,
                                index % 3 === 0 ? stylesPage.borderYellow : null,
                                index % 3 === 1 ? stylesPage.borderPurple : null,
                                index % 3 === 2 ? stylesPage.borderRed : null
                            ]}
                            onPress={() => navigation.navigate('Levels', { excersise })}
                        >
                            <Text style={stylesPage.text}>{excersise.name}</Text>
                        </TouchableOpacity>
                    )
                }
            </ImageBackground>
        </View>
    );
}