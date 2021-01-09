import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CidadaoProvider } from './src/store/AutContext';
import Home from './src/telas/Home';
import Upload from './src/telas/UploadCertidao/index';
import UploadCertidao from './src/telas/UploadDocs';

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <CidadaoProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="UploadCertidao" component={UploadCertidao} />
          <Stack.Screen name="Upload" component={Upload} />
        </Stack.Navigator>
      </CidadaoProvider>
    </NavigationContainer>
  );
}

export default App;