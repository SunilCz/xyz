
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegsiterComponent';


const Stack = createStackNavigator();

const Layout = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Use RegisterComponent directly in the navigation */}
      <Stack.Screen name="Register" component={RegisterComponent} options={{ title: 'Register Page' }} />
      <Stack.Screen name="Login" component={LoginComponent} options={{ title: 'Login Page' }} />
      {/* Add screens for other components or navigation options */}
    </Stack.Navigator>
  );
};

export default Layout;
