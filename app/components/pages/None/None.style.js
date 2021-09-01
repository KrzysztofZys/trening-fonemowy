import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#170e76',
    },
    button: {
        borderRadius: 1000,
        borderWidth: 10,
        marginTop: 30,
        width: 270,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans-extra-bold',
        fontSize: 27,
        color: '#fff',
        borderRadius: 500,
    },
    borderRed: {
        borderColor: '#fff',
    }
});