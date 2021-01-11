import { AntDesign } from '@expo/vector-icons';
import SvgUri from "expo-svg-uri";
import React, { useContext } from 'react';
import { BotaoSemFundo } from "../../components/Botoes";
import CidadaoContext from '../../store/AutContext';
// Styles e Assets
import { Container, Descriçao, Titulo } from './styles';

const Home: React.FC = ({ navigation }) => {

  const { barcode,setBarcode } = useContext(CidadaoContext)

  return (
    <Container>
    <SvgUri
      width="200"
      height="200"
      source={require("../../../assets/home/digitalize.svg")}
      style={{marginBottom: 15}}
    />
    <Titulo>Digitalize</Titulo>
    <Descriçao width="60%">
    Atualize seus documentos
    de onde estiver
    </Descriçao>

    <BotaoSemFundo top="90%" left="60%" onPress={ ()=>navigation.navigate('Documentos') }>
      <AntDesign name="arrowright" size={24} color="#fff" />
    </BotaoSemFundo>


    </Container>
  )
}

export default Home;