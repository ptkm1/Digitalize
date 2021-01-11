import { AntDesign } from '@expo/vector-icons'
import { BarCodeScanner } from 'expo-barcode-scanner'
import SvgUri from 'expo-svg-uri'
import React, { useEffect, useState } from 'react'
import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BotãoOpcoes } from '../../components/Botoes'
import api from '../../services/ConexaoApi'
import { Descriçao, Header } from '../Documentos/style'
import { Container } from './style'

const VerDocumentos: React.FC = () => {
	// TRATANDO O MODAL PARA ABRIR O LEITOR DE CODIGO DE BARRAS
	const [modalVisible, setModalVisible] = useState(false)
	const [hasPermission, setHasPermission] = useState<any>(null)

	const [DadosCidadao, setDadosCidadao] = useState<any>()

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	const [scanned, setScanned] = useState(false)
	const [barcode, setBarcode] = useState(null)

	const CodigoEscaneado = ({ type, data }) => {
		setScanned(true)
		alert(`Codigo de barras com o tipo ${type} e conteudo ${data} escaneado com sucesso`)
		setBarcode(data)
	}

	useEffect(() => {
		async function BuscarCidadao() {
			try {
				const { data } = await api.post('/cidadao/documentos', { barcode: barcode })

				return setDadosCidadao(data)
			} catch (error) {
				console.log('nao foi possivel encontrar dados')
			}
		}

		BuscarCidadao()
	}, [barcode])

	console.log(DadosCidadao)

	// Verificando se foi permitido ou não o uso da camera
	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
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
							setModalVisible(!modalVisible)
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
					<ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom: '60%'}}>
						<View style={{ borderWidth: 1, margin: 5 }}>
							<Image
								style={{ width: "100%", height: 300, resizeMode: 'cover' }}
								source={{ uri: DadosCidadao.certidao_nascimento }}
							/>
							<Text>Certidão de nascimento</Text>
						</View>
						<View style={{ borderWidth: 1, margin: 5 }}>
							<Image style={{ width: "100%", height: 300, resizeMode: 'cover' }} source={{ uri: DadosCidadao.nome_social }} />
							<Text>Nome social</Text>
						</View>
						<View style={{ borderWidth: 1, margin: 5 }}>
							<Image
								style={{ width: "100%", height: 300, resizeMode: 'cover' }}
								source={{ uri: DadosCidadao.tipagem_sanguinea }}
							/>
							<Text>Tipagem sanguinea</Text>
						</View>
						<View style={{ borderWidth: 1, margin: 5, marginBottom: '50%' }}>
							<Image
								style={{ width: "100%", height: 300, resizeMode: 'cover' }}
								source={{ uri: DadosCidadao.relatorio_medico }}
							/>
							<Text>Relatório Médico</Text>
						</View>
					</ScrollView>
				</SafeAreaView>
			) : (
				<BotãoOpcoes
					onPress={() => {
						setModalVisible(!modalVisible)
					}}
				>
					<AntDesign name="barcode" size={33} color="black" />
					<Text>Verificar Barcode</Text>
				</BotãoOpcoes>
			)}
		</Container>
	)
}

export default VerDocumentos
