import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import stylesPage from './Info.style';

export default function Info({ route, navigation }) {

    const { excersiseInfo, indexInfo, name, pointsInfo, trainings } = route.params;
    const excersise = excersiseInfo
    const points = pointsInfo
    const index = indexInfo

    if (excersiseInfo === undefined) return <View style={stylesPage.container}><Text style={stylesPage.mainText}>No data</Text></View>

    return (
        <View style={stylesPage.container}>
            <Text style={stylesPage.mainText}>INFO</Text>
            <View style={stylesPage.subcontainer}>
                <Text style={stylesPage.content}>{excersiseInfo.name}</Text>
                {name !== undefined &&  <Text style={stylesPage.content}>Trwa test: {name}</Text>}
                <Text style={stylesPage.content}>Poziom ćwiczenia: {excersiseInfo.levels[index]}</Text>
                <Text style={stylesPage.content}>{excersiseInfo.description}</Text>
                <TouchableOpacity
                    style={stylesPage.button}
                    onPress={() => navigation.navigate(excersiseInfo.route, { excersise, index, name, points, trainings })}
                >
                    <Text style={stylesPage.buttonText}>Dalej</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}