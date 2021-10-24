import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import stylesPage from './Results.style';

import { storageConstants } from '../../../constants/storageConstants';
import { readData } from '../../../services/storageService';

export default function Results() {
    const [data, setData] = useState();

    readData(storageConstants.RESULT).then(value => {
        if (value == null) console.log('blaba')
        else setData(JSON.parse(value))
    }
    )

    return (
        <View style={stylesPage.container}>
            <Text style={stylesPage.mainText}>Wyniki</Text>
            <View style={stylesPage.subcontainer}>
                {data?.length !== undefined &&
                    data.map((item, idx) =>
                        <Text key={idx} style={stylesPage.content}>{item?.name}: {item?.result}</Text>
                    )
                }
            </View>
        </View>
    );
}
