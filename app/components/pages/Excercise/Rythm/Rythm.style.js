import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end'
    },
    backimage: {
        flex: 1,
        width: '100%'
    },
    logoContainer: {
        height: '30%',
        width: '100%',
        alignItems: 'flex-end'
    },
    logo: {
        height: 50,
        width: 50,
        marginTop: 40,
        marginRight: 40
    },
    excersiseContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '100%',
        marginHorizontal: 80,
        marginBottom: 200,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageButton: {
        height: 110,
        width: 110,
        margin: 10
    },
    button: {
        
    },
    bottomContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        height: '30%',
        width: '100%',
        paddingHorizontal: 70
    },
    soundButton:{
        alignSelf: 'flex-end'
    },
    soundIcon: {
        height: 100,
        width: 100
    },
    forwardButton: {
        alignSelf: 'flex-start'
    },
    forwardButtonText: {
        fontFamily: 'open-sans-extra-bold',
        fontSize: 30,
        color: '#ffffff'

    },
    forwardButtonTextNo: {
        color: '#170e76'
    }
});