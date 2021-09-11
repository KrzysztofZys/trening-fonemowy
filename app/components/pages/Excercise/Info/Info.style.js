import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#170e76',
        alignItems: "center"
    },
    subcontainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainText: {
        marginTop: 50,
        fontFamily: 'open-sans-extra-bold',
        fontSize: 27,
        color: '#fff',
    },
    content: {
        marginBottom: 10,
        marginHorizontal: 10,
        fontFamily: 'open-sans-extra-bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff'
    },
    button: {
        borderRadius: 50,
        borderWidth: 6,
        borderColor: '#ffffff',
        marginTop: 20,
        width: 200,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'open-sans-extra-bold',
        fontSize: 20,
        color: '#ffffff',
        textTransform: 'lowercase',
        backgroundColor: '#170e76',
        borderRadius: 30,
    }
});