import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import stylesPage from './Name.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storageConstants } from '../../../constants/storageConstants';
import { saveData, readData } from '../../../services/storageService';
import { trainingsService } from '../../../services/trainingsService';

function checkNameExist(data, name) {
    let isExist = false

    if (data?.length > 0) {
        data.forEach((item) => {
            if (item?.name === name) isExist = true
            console.log(item)
        })
    } else isExist = true

    return isExist;
}

export default function Name({ navigation }) {
    const [name, setName] = useState('')
    const [isWrongInput, setIsWrongInput] = useState(false)
    const [data, setData] = useState();
    const trainings = useSelector((state) => state.trainings);
    const excersiseInfo = trainings[2];
    const dispatch = useDispatch()
    const indexInfo = 0;
    const pointsInfo = 0;

    useEffect(() => {
        dispatch(trainingsService.fetchExcersise())
    }, [])

    readData(storageConstants.RESULT).then(value => {
        if (value == null) console.log('blaba')
        else setData(JSON.parse(value))
    }
    )

    const handleForward = () => {
        if (name == null && checkNameExist(data, name)) setIsWrongInput(true)
        else {
            navigation.navigate('Info', { excersiseInfo, indexInfo, name, pointsInfo, trainings })
        }
    }



    return (
        <View style={stylesPage.container}>
            <Text style={stylesPage.mainText}>TEST</Text>
            <View style={stylesPage.subcontainer}>
                <Text style={stylesPage.content}>Podaj swoje imie i nazwisko:</Text>
                <TextInput style={stylesPage.contentInput} onChangeText={setName} value={name} />
                <TouchableOpacity
                    style={stylesPage.button}
                    onPress={() => handleForward()}
                >
                    <Text style={stylesPage.buttonText}>Dalej</Text>
                </TouchableOpacity>
                {isWrongInput && <Text style={stylesPage.content}>Podano złe imię. Podaj inne imię</Text>}
            </View>
        </View>
    );
}