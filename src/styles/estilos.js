import {StyleSheet} from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },
    flowButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    PrincipalView: {
        flexDirection: 'row',
        justifyContent: 'space-between'  
    },
    PrimeiraView: {
        justifyContent: 'flex-start'  
    },
    SegundaView: {
        justifyContent: 'flex-end'  
    },
    innerContainer: {
        paddingTop: 50,
        justifyContent: 'space-around'
    },
    title2: {
        alignSelf: 'center',
        color: '#9B9B9B',
        fontSize: 16
    }
});