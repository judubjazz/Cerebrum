'use strict';

import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: 'transparent',
    },
    toolbar: {
        backgroundColor: 'dodgerblue',
        height: 56,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    buttonStyle: {
        padding: 10,
        fontSize: 18,
        height: 166,
        margin: 10,
    },
    buttonHome: {
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    loginWelcome: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    centerText: {
        alignItems:'center',
        padding: 20,
    }

});
