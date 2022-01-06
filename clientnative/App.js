import "react-native-gesture-handler"; //DEBE ESTAR ARRIBA DE TODO
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from './Components/FirstScreen';
import Select from './Components/Select'
import UserProfile from './Components/UserProfile'

const Stack = createStackNavigator();

//NavigationContainer --> Componente principal en el que envuelvo la app tipo Router
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
         name="FirstScreen"
         component={FirstScreen}  
         options={{
           headerShown: false
         }}/>
         <Stack.Screen 
         name="Select"
         component={Select}  
         options={{
           headerShown: false
         }}/>
         <Stack.Screen 
         name = 'UserProfile'
         component = {UserProfile}
         options = {{
           headerShown: false
         }}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
