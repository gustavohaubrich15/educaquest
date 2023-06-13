import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoutesApp } from './routes/RoutesApp';
import { Container } from './shared/components/Container';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { UsuarioLogadoProvider } from './shared/context/UsuarioLogadoContext';

const app = initializeApp(firebaseConfig.config)
export const databaseFirebase = getFirestore();
export const App: React.FC = () => {

  useEffect(() => {
  }, [])

  return (
    <Container>
      <UsuarioLogadoProvider>
        <BrowserRouter>
          <RoutesApp />
        </BrowserRouter>
      </UsuarioLogadoProvider>
    </Container>
  );
}

export default App;