import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './Buttons.style';

export default function RepeatButton(props) {
    return (
        <TouchableOpacity style={styles.commentBox} disabled={false} onPress={() => props.repeatFunction()}>
            <Image style={styles.comment} source={require('../../../assets/images/try.png')} />
        </TouchableOpacity>
    )
}