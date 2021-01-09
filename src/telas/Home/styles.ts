import styled from 'styled-components/native';

export const Container = styled.View`
  flex:1;

  background: #273785;
  justify-content: center;
  align-items: center;
`

export const Titulo = styled.Text`
  font-size: 42px;
  font-weight: bold;
  color: #FFFFFF;
`

export const Descriçao = styled.Text`
  color: #FFFFFF;
  font-weight: 400;
  font-size: 22px;
  width: ${ (prop:any) => prop.width || '100%' };
  text-align: ${ (prop:any) => prop.align || 'center' };
`