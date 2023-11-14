
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../navigations/AppNavigator';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

