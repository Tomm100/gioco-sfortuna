import { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import API from '../API/API.mjs';

function NewDemoGameModal({ show, onHide }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startDemoGame = async () => {
    setLoading(true);
    try {
      const demoGame = await API.createDemoGame();
      navigate(`/demo/game/${demoGame.gameId}`);
    } catch (err) {
      console.error('Errore creazione demo:', err);
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Vuoi provare la modalità demo?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>In questa modalità potrai provare un singolo round senza registrarti. Iniziamo?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Annulla
        </Button>
        <Button variant="primary" onClick={startDemoGame} disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : 'Inizia la Demo'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewDemoGameModal;
