import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Platform, Text } from 'react-native';
import { BotãoOpcoes } from '../../../components/Botoes';
import CidadaoContext from '../../../store/AutContext';
import { Container } from './style';

const NomeSocial: React.FC = () => {


	const { barcode: bcode } = useContext(CidadaoContext)
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


	function createFormData(photo, body) {
    const data = new FormData();

    data.append('image', {
      name: 'nomesocial.jpg',
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

    fetch('http://192.168.0.103:3333/cidadao/submeternomesocial', {
      method: 'PATCH',
      body: createFormData(image, { barcode: bcode }) })
      .then(response => {
        alert('Upload feito com sucesso!');
      })
      .catch(error => {
				console.log(error)
        alert('Falha no upload');
      });
  }

	return (
		<Container>
			{image && <Image source={{ uri: image.uri }} style={{ width: 230, height: 230 }} />}

			{bcode ? <Text>{bcode}</Text> : <Text></Text>}


			<BotãoOpcoes onPress={PegarImagem}>
				{image ? <AntDesign name="camera" size={33} /> : <AntDesign name="check" size={33} color="green" />}
				<Text>Tirar foto do documento</Text>
			</BotãoOpcoes>

			{image && bcode ? (
				<BotãoOpcoes onPress={() => uploadImage()}>
					<Text>Upar</Text>
				</BotãoOpcoes>
			) : (
				<BotãoOpcoes onPress={() => {}} disabled>
					<Text>Upar</Text>
				</BotãoOpcoes>
			)}
		</Container>
	);
};

export default NomeSocial;
