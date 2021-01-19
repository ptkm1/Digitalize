import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SvgUri from 'expo-svg-uri';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, StyleSheet, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BotãoOpcoes } from '../../components/Botoes';
import api from '../../services/ConexaoApi';
import { Descriçao, Header } from '../Documentos/style';
import { Container } from './style';

const VerDocumentos: React.FC = () => {
	// TRATANDO O MODAL PARA ABRIR O LEITOR DE CODIGO DE BARRAS
	const [modalVisible, setModalVisible] = useState(false);
	const [hasPermission, setHasPermission] = useState<any>(null);

	const [AbrirFoto, setAbrirFoto] = useState<any>(false);
	const [image, setImage] = useState<any>(null);

	const [DadosCidadao, setDadosCidadao] = useState<any>();

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

	useEffect(() => {
		async function BuscarCidadao() {
			try {
				const { data } = await api.post('/cidadao/documentos', { barcode: barcode });

				return setDadosCidadao(data);
			} catch (error) {
				console.log('nao foi possivel encontrar dados');
			}
		}

		BuscarCidadao();
	}, [barcode]);


	// Verificando se foi permitido ou não o uso da camera
	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<Container>
			{AbrirFoto && (
				<Modal
					animationType="slide"
					transparent={false}
					visible={AbrirFoto}
					onRequestClose={() => setAbrirFoto(false)}
				>
					<Button title="Fechar" onPress={() => setAbrirFoto(false)} />
					<Image source={{ uri: image }} resizeMode="stretch" style={{ width: '100%', height: '100%' }} />
				</Modal>
			)}
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

			<Header>
				<SvgUri width="200" height="200" source={require('../../../assets/Logo.svg')} />
			</Header>

			<Descriçao>Digitalize de forma simples a identidade do cidadão</Descriçao>

			{barcode && DadosCidadao ? (
				<SafeAreaView style={{ height: '80%', width: '100%' }}>
					<ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: '60%' }}>
						<TouchableOpacity
							style={{ borderWidth: 1, margin: 5 }}
							onPress={() => {
								setAbrirFoto(true);
								setImage(
									DadosCidadao.certidao_nascimento !== 'http://192.168.0.103:3333/uploads/'
										? DadosCidadao.certidao_nascimento
										: 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg'
								);
							}}
						>
							<Image
								style={{ width: '100%', height: 300, resizeMode: 'cover' }}
								source={{
									uri:
										DadosCidadao.certidao_nascimento !== 'http://192.168.0.103:3333/uploads/'
											? DadosCidadao.certidao_nascimento
											: 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg',
								}}
							/>
							<Text>Certidão de nascimento</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{ borderWidth: 1, margin: 5 }}
							onPress={() => {
								setAbrirFoto(true);
								setImage(
									DadosCidadao.nome_social !== 'http://192.168.0.103:3333/uploads/'
										? DadosCidadao.nome_social
										: 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg'
								);
							}}
						>
							<Image
								style={{ width: '100%', height: 300, resizeMode: 'cover' }}
								source={{
									uri:
										DadosCidadao.nome_social !== 'http://192.168.0.103:3333/uploads/'
											? DadosCidadao.nome_social
											: 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg',
								}}
							/>
							<Text>Nome social</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{ borderWidth: 1, margin: 5 }}
							onPress={() => {
								setAbrirFoto(true);
								setImage(
									DadosCidadao.tipagem_sanguinea !== 'http://192.168.0.103:3333/uploads/'
										? DadosCidadao.tipagem_sanguinea
										: 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg'
								);
							}}
						>
							<Image
								style={{ width: '100%', height: 300, resizeMode: 'cover' }}
								source={{
									uri:
										DadosCidadao.tipagem_sanguinea !== 'http://192.168.0.103:3333/uploads/'
											? DadosCidadao.tipagem_sanguinea
											: 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg',
								}}
							/>
							<Text>Tipagem sanguinea</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ borderWidth: 1, margin: 5, marginBottom: '50%' }}
							onPress={() => {
								setAbrirFoto(true);
								setImage(
									DadosCidadao.relatorio_medico !== 'http://192.168.0.103:3333/uploads/'
										? DadosCidadao.relatorio_medico
										: 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg'
								);
							}}
						>
							<Image
								style={{ width: '100%', height: 300, resizeMode: 'cover' }}
								source={{
									uri:
										DadosCidadao.relatorio_medico !== 'http://192.168.0.103:3333/uploads/'
											? DadosCidadao.relatorio_medico
											: 'https://image.freepik.com/free-vector/404-error-page-found_41910-364.jpg',
								}}
							/>
							<Text>Relatório Médico</Text>
						</TouchableOpacity>
					</ScrollView>
				</SafeAreaView>
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
