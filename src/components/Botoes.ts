import styled from 'styled-components/native';

export const BotaoSemFundo = styled.TouchableOpacity`
  border-radius: 4px;
  position: absolute;
  width: ${ (prop:any) => prop.width || "50%"  };
  height: ${ (prop:any) => prop.height || "50px"};
  justify-content: center;
  align-items: center;
  top: ${ (prop:any) => prop.top || "5px"};
  left: ${ (prop:any) => prop.left || "5px"};
`
export const TextoBotaoSemFundo = styled.Text`

`