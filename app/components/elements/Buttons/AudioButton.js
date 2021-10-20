import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './Buttons.style';

export default function AudioButton(props) {
    return (
        <TouchableOpacity
            style={styles.soundButton}
            disabled={!props.state}
            onPress={() => props.repeatFunction()}>
            <Image
                style={[styles.soundIcon, !props.state && styles.buttonDisabled]}
                source={require('../../../assets/images/audio.png')}>
            </Image>
        </TouchableOpacity>
    )
}