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
        borderRadius: 1000,
        borderWidth: 10,
        marginTop: 30,
        width: 165,
        height: 165,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans-extra-bold',
        fontSize: 27,
        color: '#170e76',
        backgroundColor: '#fff',
        borderRadius: 500,
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