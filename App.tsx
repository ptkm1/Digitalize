import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CidadaoProvider } from './src/store/AutContext';
import Certidao from './src/telas/Certidao';
import Documentos from './src/telas/Documentos';
import Home from './src/telas/Home';
import SubmeterDocs from './src/telas/SubmeterDocs';
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
          <Stack.Screen name="Documentos" component={Documentos} options={{headerShown: false}} />
          <Stack.Screen name="SubmeterDocs" component={SubmeterDocs} options={{headerShown: false}} />
          <Stack.Screen name="Certidao" component={Certidao} options={{headerShown: false}} />
        </Stack.Navigator>
      </CidadaoProvider>
    </NavigationContainer>
  );
}

export default App;