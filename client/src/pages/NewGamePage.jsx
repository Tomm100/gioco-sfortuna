// src/pages/NewGamePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Spinner, Button, Container, Stack } from 'react-bootstrap';
import API from '../API/API.mjs';

function NewGamePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Se vuoi creare subito la partita senza click:
    // creaPartita();
  }, []);

  const creaPartita = async () => {
    setLoading(true);
    try {
      const newGame = await API.createGame(); // assume restituisce { gameId: '...' }
     

      navigate(`/user/game/${newGame.gameId}`);
    } catch (err) {
      console.error('Errore creazione partita:', err);
      setLoading(false);
    }
  };

  return (


    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      {loading ? (
        <>
          <Spinner animation="border" />&nbsp;Creazione partita…
        </>
      ) : (
        /* Stack per tenere i due bottoni in linea con un po’ di spazio */
        
        <Stack
  direction="horizontal"
  gap={3}
  className="justify-content-center w-auto"   // 👈  centriamo e togliamo il 100 % di larghezza
>
  <Button variant="primary" onClick={creaPartita}>
    Clicca per iniziare
  </Button>

  <Button variant="danger" onClick={() => navigate(-1)}>
    Annulla
  </Button>
</Stack>

      )}
    </Container>
  
  );
}

export default NewGamePage;
