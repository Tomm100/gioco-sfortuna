// src/components/NewGameModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import API from '../API/API.mjs';

function NewGameModal({ show, onHide }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const creaPartita = async () => {
    setLoading(true);
    try {
      const newGame = await API.createGame();
      onHide(); // chiudi il modale prima di navigare
      navigate(`/user/game/${newGame.gameId}`);
    } catch (err) {
      console.error('Errore creazione partita:', err);
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vuoi iniziare una nuova partita?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Creeremo una nuova partita da zero. Sei sicuro di voler continuare?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Annulla
        </Button>
        <Button variant="primary" onClick={creaPartita} disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Conferma e Inizia'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewGameModal;
