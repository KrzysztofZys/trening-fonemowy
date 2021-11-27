import * as React from 'react';
import { Text, View, SafeAreaView, ScrollView, } from 'react-native';
import stylesPage from './Credits.style';
import * as creditsData from '../../../assets/images/credits.json';

export default function Credits() {
    console.log(creditsData.credits)

    return (
        <View style={stylesPage.container}>
            <Text style={stylesPage.mainText}>O aplikacji</Text>
            <Text style={stylesPage.text}>Aplikacja została zreazlizowana w ramach pracy magisterskiej Krzysztofa Zysa na Politechnice Poznańskiej we współpracy z logopedą Natalią Wiśniewską. Promotorem pracy był dr inż. Rafał Klaus</Text>
            <Text style={stylesPage.text}>Lista autorów obrazków:</Text>
            <SafeAreaView style={stylesPage.subcontainer}>
                <ScrollView style={stylesPage.scrollContainer}>
                    {creditsData.credits?.length !== undefined &&
                        creditsData.credits.map((item, idx) =>
                            <Text key={idx} style={stylesPage.content}>{item?.name}: {item?.author}</Text>
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
