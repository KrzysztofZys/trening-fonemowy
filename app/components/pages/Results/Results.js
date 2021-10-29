import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, } from 'react-native';
import stylesPage from './Results.style';
import { useIsFocused } from "@react-navigation/native";

import { storageConstants } from '../../../constants/storageConstants';
import { readData } from '../../../services/storageService';

export default function Results() {
    const [data, setData] = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        readData(storageConstants.RESULT).then(value => {
            if (value == null) console.log('blaba')
            else setData(JSON.parse(value))
        }
        )
    }, [isFocused])


    return (
        <View style={stylesPage.container}>
            <Text style={stylesPage.mainText}>Wyniki</Text>
            <SafeAreaView style={stylesPage.subcontainer}>
                <ScrollView style={stylesPage.scrollContainer}>
                    {data?.length !== undefined &&
                        data.map((item, idx) =>
                            <Text key={idx} style={stylesPage.content}>{item?.name}: {item?.result}</Text>
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
