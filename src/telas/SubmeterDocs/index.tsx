import SvgUri from 'expo-svg-uri';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BotãoOpcoes } from '../../components/Botoes';
import { Container, Descriçao, Header, OpçoesBotoes } from '../Documentos/style';

const SubmeterDocs: React.FC = ({ navigation }) => {
	return (
		<Container>
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

						<BotãoOpcoes>
							<SvgUri
								width="76"
								height="73"
								source={require('../../../assets/opcoes1/adicionardocumentos.svg')}
							/>
							<Text>Nome social</Text>
						</BotãoOpcoes>

						<BotãoOpcoes>
							<SvgUri
								width="76"
								height="73"
								source={require('../../../assets/opcoes1/verdocumentos.svg')}
							/>
							<Text>Relatório médico</Text>
						</BotãoOpcoes>

						<BotãoOpcoes>
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

export default SubmeterDocs;
