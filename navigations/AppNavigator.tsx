
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterComponent from '../components/RegsiterComponent';
import LoginComponent from '../components/LoginComponent';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="register" component={RegisterComponent} />
            <Stack.Screen name="login" component={LoginComponent} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
