import * as React from 'react';
import { View, Image } from 'react-native';
import styles from './LogoExcersise.style';

export default function LogoExcersise() {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/logo.png')}></Image>
        </View>
    )
}