import { StyleSheet } from "react-native";

export default styles = (width) = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        height: 55,
        zIndex: 30
    },
    non: {
        backgroundColor: '#f6c344',
        top: 40,
        height: 15,
        width: '100%'
    },
    active: {
        position: 'absolute',
        top: 40,
        height: 15,
        zIndex: 100,
        backgroundColor: '#6222f5'
    }
})