import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CidadaoProvider } from './src/store/AutContext';
import Documentos from './src/telas/Documentos';
import SubmeterDocs from './src/telas/EscolhaDeDocumentos';
import Home from './src/telas/Home';
import Certidao from './src/telas/UploadDocumentos/Certidao';
import NomeSocial from './src/telas/UploadDocumentos/NomeSocial';
import RelatorioMedico from './src/telas/UploadDocumentos/RelatorioMedico';
import TipagemSanguinea from './src/telas/UploadDocumentos/TipagemSanguinea';
import VerDocumentos from './src/telas/VerDocumentos';

const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <CidadaoProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="Documentos" component={Documentos} options={{headerShown: false}} />
          <Stack.Screen name="SubmeterDocs" component={SubmeterDocs} options={{headerShown: false}} />
          <Stack.Screen name="VerDocumentos" component={VerDocumentos} options={{headerShown: false}} />
          {/* Rotas de documentos */}
          <Stack.Screen name="Certidao" component={Certidao} options={{headerShown: false}} />
          <Stack.Screen name="NomeSocial" component={NomeSocial} options={{headerShown: false}} />
          <Stack.Screen name="RelatorioMedico" component={RelatorioMedico} options={{headerShown: false}} />
          <Stack.Screen name="TipagemSanguinea" component={TipagemSanguinea} options={{headerShown: false}} />
        </Stack.Navigator>
      </CidadaoProvider>
    </NavigationContainer>
  );
}

export default App;