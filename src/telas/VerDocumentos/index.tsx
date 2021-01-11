import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, StyleSheet, Text } from 'react-native';
import { BotãoOpcoes } from '../../components/Botoes';
import { Container } from './style';


const VerDocumentos: React.FC = () => {
	// TRATANDO O MODAL PARA ABRIR O LEITOR DE CODIGO DE BARRAS
	const [modalVisible, setModalVisible] = useState(false);
	const [hasPermission, setHasPermission] = useState<any>(null);

  const imagem = 'https://cdn.dribbble.com/users/332742/screenshots/14889756/media/f2d97d6dffb43d92623e091088d978d5.png?compress=1&resize=800x600';

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

	// Verificando se foi permitido ou não o uso da camera
	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<Container>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
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
				{scanned && <Button title={'Escanear de novo'} onPress={() => setScanned(false)} />}
			</Modal>

			{barcode ? (
          <>
          <Image style={{ width: 200, height: 200 }} source={{uri:imagem}} />
          <Text>Cidadão Achado</Text>
        </>
			) : (
				<BotãoOpcoes
					onPress={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<AntDesign name="barcode" size={33} color="black" />
					<Text>Verificar Barcode</Text>
				</BotãoOpcoes>
			)}
		</Container>
	);
};

export default VerDocumentos;
