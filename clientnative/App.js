<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
=======
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SingIn from "./Components/SingIn";
import SingUp from "./Components/SingUp"; 
>>>>>>> 6d118004e1a107fc053cea0a52e3a6781fe03c06

const Stack = createStackNavigator();

const App = () => {
  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======
  <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen name="singIn" component={SingIn} options={{headerShown:false}} />
      <Stack.Screen name="singUp" component={SingUp} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};
export default App;
>>>>>>> 6d118004e1a107fc053cea0a52e3a6781fe03c06
