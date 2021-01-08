import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Container, Texto } from './src/components/styleds/Layout';



export default function App() {
  return (
    <Container>
      <Texto>Open up App.tsx to start working on your app!</Texto>
      <StatusBar style="dark" />
    </Container>
  );
}
