import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import stylesPage from './Info.style';

export default function Info({ route, navigation }) {

    const { excersise, index } = route.params;

    if (excersise === undefined) return <View style={stylesPage.container}><Text style={stylesPage.mainText}>No data</Text></View>

    return (
        <View style={stylesPage.container}>
            <Text style={stylesPage.mainText}>INFO</Text>
            <View style={stylesPage.subcontainer}>
                <Text style={stylesPage.content}>Poziom ćwiczenia: {excersise.levels[index]}</Text>
                <Text style={stylesPage.content}>{excersise.description}</Text>
                <TouchableOpacity
                    style={stylesPage.button}
                    onPress={() => navigation.navigate(excersise.route, { excersise, index })}
                >
                    <Text style={stylesPage.buttonText}>Dalej</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}