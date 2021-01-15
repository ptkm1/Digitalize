import { BarCodeScanner } from 'expo-barcode-scanner';
import SvgUri from 'expo-svg-uri';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BotãoOpcoes } from '../../components/Botoes';
import api from '../../services/ConexaoApi';
import CidadaoContext from '../../store/AutContext';
import { Container, Descriçao, Header, OpçoesBotoes } from '../Documentos/style';

const EscolhaDeDocumentos: React.FC = ({ navigation }) => {

	const { barcode, setBarcode } = useContext(CidadaoContext)

		// TRATANDO O MODAL PARA ABRIR O LEITOR DE CODIGO DE BARRAS
		const [modalVisible, setModalVisible] = useState(false);

		const [hasPermission, setHasPermission] = useState<any>(null);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const [scanned, setScanned] = useState(false);
	const [barcoded, setBarcoded] = useState(null);

	const CodigoEscaneado = ({ type, data }) => {
		setScanned(true);
		alert(`Codigo de barras com o tipo ${type} e conteudo ${data} escaneado com sucesso`);
		setBarcoded(data)
		setBarcode(data)
	};


	useEffect(()=>{ setModalVisible(!modalVisible) },[])

	const [cadastrarDados, setCadastrarDados] = useState(false)


	const verificaCidadao = async () => {
		if(scanned === true) {
			try {
				const data = await api.get(`/cidadao/${barcode}`)
				console.log(data)
			} catch (error) {
				setCadastrarDados(true)
			}
		}
	}

	barcode && verificaCidadao()



	//Variaveis de cadastro

	const [nome,setNome] = useState<any>()
	const [rg,setRg] = useState<any>()
	const [telefone,setTelefone] = useState<any>()



	const CadastrarNovoCidadao = async () => {

		const dados:any =
		{	id: barcode,
			nome: nome,
			rg: rg,
			telefone: telefone}

			try {
				const {data} = await api.post('http://192.168.0.103:3333/cidadao', dados)

				console.log(data)
				setBarcode(barcode)
				setModalVisible(!modalVisible)
			} catch (error) {
				console.log(error)
			}

	}

	return (
		<Container>
			{cadastrarDados ? (
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={ () => setModalVisible(false) }
			>
				<View style={{ width: "100%", height: "100%", backgroundColor: "#fff", zIndex: 510 }}>
					<TextInput onChangeText={ (e)=>setNome(e) } placeholder="Digite o nome" />
					<TextInput onChangeText={ (e) => setRg(e) } placeholder="Digite o RG" />
					<TextInput onChangeText={ (e) => setTelefone(e) } placeholder="Digite o telefone" />

					<Button title="Cadastre o usuario" onPress={CadastrarNovoCidadao} />
				</View>

			</Modal>) : (
				<Text></Text>
			) }

		<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={ () => setModalVisible(false) }
			>
				{barcoded ? (
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

			<Header>
				<SvgUri width="200" height="200" source={require('../../../assets/Logo.svg')} />
			</Header>

			<Descriçao>Digitalize de forma simples a identidade do cidadão</Descriçao>
			<OpçoesBotoes>
				<SafeAreaView>
					<ScrollView
					contentContainerStyle={{paddingBottom: '80%', width: "100%"}}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical>
						<BotãoOpcoes onPress={()=> navigation.navigate('Certidao')} >
							<SvgUri
								width="76"
								height="73"
								source={require('../../../assets/opcoes1/verdocumentos.svg')}
							/>
							<Text>Certidao de nascimento</Text>
						</BotãoOpcoes>

						<BotãoOpcoes onPress={()=> navigation.navigate('NomeSocial')}>
							<SvgUri
								width="76"
								height="73"
								source={require('../../../assets/opcoes1/adicionardocumentos.svg')}
							/>
							<Text>Nome social</Text>
						</BotãoOpcoes>

						<BotãoOpcoes onPress={()=> navigation.navigate('RelatorioMedico')}>
							<SvgUri
								width="76"
								height="73"
								source={require('../../../assets/opcoes1/verdocumentos.svg')}
							/>
							<Text>Relatório médico</Text>
						</BotãoOpcoes>

						<BotãoOpcoes onPress={()=> navigation.navigate('TipagemSanguinea')}>
							<SvgUri
								width="76"
								height="73"
								source={require('../../../assets/opcoes1/adicionardocumentos.svg')}
							/>
							<Text>Tipagem sanguínea</Text>
						</BotãoOpcoes>
					</ScrollView>
				</SafeAreaView>
			</OpçoesBotoes>
		</Container>
	);
};

export default EscolhaDeDocumentos;
