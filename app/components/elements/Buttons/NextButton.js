import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Buttons.style';

export default function NextButton(props) {
    return (
        <TouchableOpacity
            style={styles.forwardButton}
            disabled={!props.state}
            onPress={() => props.functionToDo()}>
            <Text style={[styles.forwardButtonText, !props.state && styles.buttonDisabled]}>
                    {props.isFinished ? 'wróć' : 'dalej'}
            </Text>
        </TouchableOpacity>
    )
}