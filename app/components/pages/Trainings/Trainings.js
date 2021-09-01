import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import stylesPage from './Trainings.style';
import { trainingsService } from '../../../services/trainingsService';
import { excersises } from '../../../constants/excersisesConstants';

export default function Trainings({ navigation }) {
    const trainings = useSelector((state) => state.trainings);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(trainingsService.fetchExcersise())
    }, [])

    if (trainings.length < 0) return <Text>Loadings</Text>

    return (
        <View style={stylesPage.container}>
            <ImageBackground source={require('../../../assets/backgrounds/Excersises.png')} resizeMode="cover" style={stylesPage.backimage}>
                {
                    trainings.map((excersise, index) =>
                        <TouchableOpacity key={index}
                            style={[
                                stylesPage.button,
                                index%3 === 0 ? stylesPage.borderYellow : null,
                                index%3 === 1 ? stylesPage.borderPurple : null,
                                index%3 === 2 ? stylesPage.borderRed : null
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