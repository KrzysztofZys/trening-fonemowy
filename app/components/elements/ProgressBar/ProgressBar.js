import styles from './ProgressBar.style';
import * as React from 'react';
import { Text, View, Image } from 'react-native';

export default function ProgressBar(props) {
    const width = ((props.counter + 1) * 100) / props.max;
    const widthString = width + '%';

    return (
        <View style={styles.container}>
            <View style={styles.non}/>
            <View style={{...styles.active, width: widthString}}/>
        </View>
    )
}