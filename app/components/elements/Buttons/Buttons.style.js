import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    comment:{
        height: 100,
        width: 100
    },
    commentBox:{
        position:'absolute',
        height: 100,
        width: 100,
        left: '38%',
        bottom: '8%'
    },
    soundButton:{
        alignSelf: 'flex-end'
    },
    soundIcon: {
        height: 100,
        width: 100
    },
    buttonDisabled: {
        opacity: 0.1
    },
    forwardButton: {
        alignSelf: 'flex-start'
    },
    forwardButtonText: {
        fontFamily: 'open-sans-extra-bold',
        fontSize: 30,
        color: '#ffffff'

    },
});