import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const UserProfile = () => {
    return (
        <View style = {styles.container} >
            <Image />
            <Text>Nombre y apellido</Text>
            <Text>Reputacion</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      },
})

export default UserProfile;
