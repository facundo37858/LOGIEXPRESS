import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../Components/ProfileScreen';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name= 'ProfileScreen'
                component={ProfileScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack
