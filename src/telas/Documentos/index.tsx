import SvgUri from 'expo-svg-uri';
import React from 'react';
import { Text } from 'react-native';
import { BotãoOpcoes } from '../../components/Botoes';
import { Container, Descriçao, Header, OpçoesBotoes } from './style';

const Documentos: React.FC = ({ navigation }) => {
	return (
		<Container>
			<Header>
				<SvgUri width="200" height="200" source={require('../../../assets/Logo.svg')} />
			</Header>

			<Descriçao>Digitalize de forma simples a identidade do cidadão</Descriçao>
			<OpçoesBotoes>
				<BotãoOpcoes onPress={ () => navigation.navigate('SubmeterDocs') } >
					<SvgUri width="76" height="73" source={require('../../../assets/opcoes1/verdocumentos.svg')} />
					<Text>Pesquisar por Documentos</Text>
				</BotãoOpcoes>

				<BotãoOpcoes>
					<SvgUri
						width="76"
						height="73"
						source={require('../../../assets/opcoes1/adicionardocumentos.svg')}
					/>
					<Text>Pesquisar por Documentos</Text>
				</BotãoOpcoes>
			</OpçoesBotoes>
		</Container>
	);
};

export default Documentos;
