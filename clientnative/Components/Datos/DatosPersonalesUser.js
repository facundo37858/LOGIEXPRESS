import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const DatosPersonalesUser = () => {
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.perfilTex}>¡Bienvenido!</Text>
            </ScrollView>
        </View>
    )
}

export default DatosPersonalesUser

const styles = StyleSheet.create({
    perfilTex: {
        fontSize: 19,
        fontWeight: "bold",
        alignItems: "flex-start",
        marginTop: 40,
        marginLeft: 20,
      },
})
