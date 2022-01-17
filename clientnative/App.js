import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SingIn from "./Components/SingIn";
import SingUp from "./Components/SingUp";
import EditProfile from "./Components/EditProfile";
import EditProfileCarrier from "./Components/EditProfileCarrier";
import CompleteProfileUser from "./Components/CompletarPerfil/CompleteProfileUser";
import CompleteProfileCarrier from "./Components/CompletarPerfil/CompleteProfileCarrier";
import ProfileUserScreen from "./Components/ProfileUserScreen";
import ProfileScreenCarrier from "./Components/ProfileScreenCarrier";
import ScreenMap from "./Components/ScreenMap";
import RequestTravel from "./Components/RequestTravel";
import StartCarrier from "./Components/ComenzarViaje/StartCarrier";
import ScreenWaiting from "./Components/ScreenWaiting";
import PaymentApp from "./Components/Payment/PaymentApp";
import StartUser from "./Components/ComenzarViaje/StartUser"

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
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfileCarrier"
            component={EditProfileCarrier}
            options={{ headerShown: false }}
          />
         
          <Stack.Screen
            name="CompleteProfileUser"
            component={CompleteProfileUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CompleteProfileCarrier"
            component={CompleteProfileCarrier}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileScreenCarrier"
            component={ProfileScreenCarrier}
          />
          <Stack.Screen
            name="ScreenMap"
            component={ScreenMap}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileUserScreen"
            component={ProfileUserScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RequestTravel"
            component={RequestTravel}
            options={{ headerShown: false }}
          />
           <Stack.Screen 
          name="StartUser"
          component={StartUser}
          />
          <Stack.Screen
            name='PaymentApp'
            component={PaymentApp}
            options={{hederShown:false}}
          />
          <Stack.Screen 
          name="StartCarrier"
          component={StartCarrier}
          options={{ headerShown: false }}
          /> 
          <Stack.Screen 
          name="ScreenWaiting"
          component={ScreenWaiting}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
