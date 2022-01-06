import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const FirstScreen = () => {
    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                ¡Bienvenidos a LogiExpress!
            </Text>
            <TouchableOpacity 
            onPress={() => navigation.navigate('Select')}
            style={styles.button}>
                <Text style={styles.buttonText}>¡Comencemos!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      },
    title: {
        fontSize: 20,
    },
    button: {
        backgroundColor: '#61B15A',
        height: 50,
        width: 150,
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default FirstScreen;