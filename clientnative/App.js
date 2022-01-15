import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
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
import Pago from "./Components/Pago";


const Stack = createStackNavigator();

const App = () => {
  // const [publishableKey, setPublishableKey] = useState('');
  
  // useEffect(() => {
  //   async function init() {
  //     const publishableKey = await fetchPublishableKey()
  //     if (publishableKey) {
  //       setPublishableKey(publishableKey)
  //     }
  //   }
  //   init();
  // }, []);

  //publishableKey={publishableKey}

  return (
    <StripeProvider
    publishableKey= "pk_test_51KHwMJH58Ljah9wGjMPQ9Os5fhEj5awCKf7ARtjrqcwUFGAVniXX5CTP3fP492gqrJv3MerKLDbnAByXzpPkYWsC00P8X1yX8l"
  >
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
            options={{ headerShown: false }}
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
              name="Pago"
              component={Pago}
              options={{ headerShown: false }}
            />
        
        </Stack.Navigator>
      </NavigationContainer>
    
    </Provider>
    </StripeProvider>
  );
};
export default App;
