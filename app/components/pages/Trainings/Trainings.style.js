import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: -70
    },
    backimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    button: {
        borderRadius: 50,
        borderWidth: 6,
        borderLeftWidth: 9,
        borderRightWidth: 9,
        marginTop: 20,
        width: 300,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans-extra-bold',
        fontSize: 20,
        color: '#170e76',
        textTransform: 'lowercase',
        backgroundColor: '#fff',
        borderRadius: 30
    },
    borderPurple: {
        borderColor: '#6222f5',
    },
    borderYellow: {
        borderColor: '#f6c344',
    },
    borderRed: {
        borderColor: '#ff6379',
    }
});