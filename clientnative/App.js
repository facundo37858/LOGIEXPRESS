import React, { useState, useEffect } from "react";
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
import Pago from "./Components/Pago";
import { StripeProvider } from "@stripe/stripe-react-native";
import { fetchPublishableKey } from "./Components/helpers";

const Stack = createStackNavigator();

const App = () => {
  const [publishableKey, setPublishableKey] = useState('');
  
  useEffect(() => {
    async function init() {
      const publishableKey = await fetchPublishableKey()
      if (publishableKey) {
        setPublishableKey(publishableKey)
      }
    }
    init();
  }, []);


  return (
   
    <Provider store={store}>
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier"
          >
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
      </StripeProvider>
    </Provider>
  );
};
export default App;
