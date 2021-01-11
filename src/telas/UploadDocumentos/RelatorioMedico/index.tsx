import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, Platform, StyleSheet, Text } from 'react-native';
import { BotãoOpcoes } from '../../../components/Botoes';
import { Container } from './style';

const RelatorioMedico: React.FC = () => {

	// TRATANDO O MODAL PARA ABRIR O LEITOR DE CODIGO DE BARRAS
	const [modalVisible, setModalVisible] = useState(false);

	// TRATANDO CAPTURA DE IMAGEM

	const [image, setImage] = useState<any>(null);
	console.log(image)

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Desculpa, mas você precisa nos dar permissão para acessar sua camera!');
				}
			}
		})();
	}, []);

	const PegarImagem = async () => {
		let result: any = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.6,
		});

		if (!result.cancelled) {
			setImage(result);
		}
	};

	// TRATANDO CODIGO DE BARRAS

	const [hasPermission, setHasPermission] = useState<any>(null);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const [scanned, setScanned] = useState(false);
	const [barcode, setBarcode] = useState(null);

	const CodigoEscaneado = ({ type, data }) => {
		setScanned(true);
		alert(`Codigo de barras com o tipo ${type} e conteudo ${data} escaneado com sucesso`);
		setBarcode(data);
	};


	function createFormData(photo, body) {
    const data = new FormData();

    data.append('image', {
      name: 'relatoriomedico.jpg',
      type: image.type+'/jpg',
      uri:
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
		});

    return data;
	}

	function uploadImage() {
    // IP servidor WEBLINK: 31.220.48.33

    fetch('http://192.168.0.107:3333/cidadao/submeterrelatoriomedico', {
      method: 'PATCH',
      body: createFormData(image, { barcode: barcode }) })
      .then(response => {
        alert('Upload feito com sucesso!');
      })
      .catch(error => {
				console.log(error)
        alert('Falha no upload');
      });
  }

	// Verificando se foi permitido ou não o uso da camera
	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<Container>
			{image && <Image source={{ uri: image.uri }} style={{ width: 230, height: 230 }} />}

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={ () => setModalVisible(false) }
			>
				{barcode ? (
					<BotãoOpcoes
						style={{ zIndex: 15 }}
						onPress={() => {
							setModalVisible(!modalVisible);
						}}
					>
						<Text>FecharModal </Text>
					</BotãoOpcoes>
				) : (
					<Text>Verifique algum codigo</Text>
				)}

				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : CodigoEscaneado}
					style={StyleSheet.absoluteFillObject}
				/>
				{scanned && <Button title={'Escanear de novo'} onPress={ () => setScanned(false) } />}
			</Modal>

			{barcode ? <Text>{ barcode }</Text> : <Text></Text>}


			<BotãoOpcoes
				onPress={() => { setModalVisible(!modalVisible) }}	>
        { image ?(
         <AntDesign name="check" size={33} color="green" />
				 ) : (
				 <AntDesign name="camera" size={33} />
        ) }

				<Text>Verificar Barcode</Text>
			</BotãoOpcoes>

      <BotãoOpcoes onPress={PegarImagem}>
				{ image ?(
					<AntDesign name="check" size={33} color="green" />
					) : (
          <AntDesign name="camera" size={33} />
        ) }
				<Text>Tirar foto do documento</Text>
			</BotãoOpcoes>

      { image && barcode ? (
        <BotãoOpcoes onPress={()=>uploadImage()}>
          <Text>Upar</Text>
        </BotãoOpcoes>
      ) : (
        <BotãoOpcoes onPress={()=>{}} disabled >
          <Text>Upar</Text>
        </BotãoOpcoes>
      ) }


		</Container>
	);
};

export default RelatorioMedico;
