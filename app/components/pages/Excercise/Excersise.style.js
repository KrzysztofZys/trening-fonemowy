import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignContent: 'flex-end'
    },
    backimage: {
        flex: 1,
        width: '100%'
    },
    excersiseContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '100%',
        marginHorizontal: 80,
        marginTop: '13%',
        marginBottom: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageButton: {
        height: 140,
        width: 140,
        margin: 20
    },
    imageButtonLetter: {
        height: 142,
        width: 140,
        marginBottom: 20,
        marginHorizontal: 20
    },
    imageButtonLetterTablet: {
        height: 142,
        width: 140,
        marginBottom: 20,
        marginHorizontal: 70
    },
    imageButtonSmall: {
        height: 110,
        width: 110,
        margin: 10
    },
    imageButtonSmallTablet: {
        height: 110,
        width: 110,
        margin: 25
    },
    imageButtonLow: {
        height: 60,
        width: 60,
        margin: 15
    },
    imageButtonHigh: {
        height: 140,
        width: 140,
        margin: 15
    },
    imageButtonDice: {
        height: 100,
        width: 100,
        margin: 10
    },
    imageButtonDiceTablet: {
        height: 120,
        width: 120,
        margin: 20
    },
    button: {
        
    },
    buttonDisabled: {
        opacity: 0.1
    },
    bottomContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        height: '30%',
        width: '100%',
        paddingHorizontal: '15%'
    },
    name: {
        fontSize: 25,
        marginHorizontal: 5
    }
});