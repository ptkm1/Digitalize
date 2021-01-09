import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const UploadCertidao: React.FC = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState<any>(null);
  useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
  }, []);




  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState(null);

  const ConsultaFeita = async () => {
    await setBarcode(null)
   return navigation.navigate('Home')
  }


  const CodigoEscaneado = ({ type, data }) => {
    setScanned(true);
    alert(`Codigo de barras com o tipo ${type} e conteudo ${data} has been scanned!`);
    setBarcode(data);
  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : CodigoEscaneado}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Escanear de novo'} onPress={() => setScanned(false)} />}
      { barcode && <Button title={'Consultar Cidadão'} onPress={() => ConsultaFeita()} /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

export default UploadCertidao;