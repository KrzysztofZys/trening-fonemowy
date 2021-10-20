import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './Buttons.style';

export default function OkButton(props) {
    return (
        <TouchableOpacity style={styles.commentBox} disabled={false} onPress={() => props.nextFunction()}>
            <Image style={styles.comment} source={require('../../../assets/images/ok.png')} />
        </TouchableOpacity>
    )
}