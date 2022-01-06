import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, View, Text, StyleSheet, Button } from "react-native";

const Select = () => {
 const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>¿Cual es tu rol?</Text>
      <View style={styles.btnContainer}>
        <Button title="Chofer" />
        <Button 
        title="Usuario"
        onPress={() => navigation.navigate('UserProfile')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer:{
      margin: 20,
  }
});

export default Select;
