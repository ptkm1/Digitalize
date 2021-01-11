import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, Platform, StyleSheet, Text } from 'react-native';
import { BotãoOpcoes } from '../../components/Botoes';
import { Container } from './style';

const Certidao: React.FC = () => {

	// TRATANDO O MODAL PARA ABRIR O LEITOR DE CODIGO DE BARRAS
	const [modalVisible, setModalVisible] = useState(false);

	// TRATANDO CAPTURA DE IMAGEM

	const [image, setImage] = useState(null);

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
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
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
		<Container>
			{image && <Image source={{ uri: image }} style={{ width: 230, height: 230 }} />}

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

			{barcode ? <Text>{barcode}</Text> : <Text></Text>}


			<BotãoOpcoes
				onPress={() => { setModalVisible(!modalVisible) }}	>
        { image ?(
         <AntDesign name="barcode" size={20} />
        ) : (
          <AntDesign name="check" size={20} color="green" />
        ) }

				<Text>Verificar Barcode</Text>
			</BotãoOpcoes>

      <BotãoOpcoes onPress={PegarImagem}>
				{ image ?(
          <AntDesign name="camera" size={20} />
        ) : (
          <AntDesign name="check" size={20} color="green" />
        ) }
				<Text>Tirar foto do documento</Text>
			</BotãoOpcoes>

      { image && barcode ? (
        <BotãoOpcoes onPress={()=>{}}>
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

export default Certidao;
