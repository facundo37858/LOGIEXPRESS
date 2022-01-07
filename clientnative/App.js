import React from "react";
import {Provider} from 'react-redux'
import {store} from './store/index'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingIn from "./Components/SingIn";
import SingUp from "./Components/SingUp";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="singIn"
          component={SingIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="singUp" component={SingUp} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};
export default App;
