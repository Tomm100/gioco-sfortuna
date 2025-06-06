// src/components/game/ModalResult.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalResult(props) {
  return (
    <Modal show={true} centered backdrop="static">
      <Modal.Header>
      
        <Modal.Title className='text-center w-100'>{props.correct ? '🎉 Round vinto! 🎉' : '😔 Round perso 😔'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.correct ? (
          <p>Hai posizionato correttamente la carta.</p>
        ) : (
          <p>Peccato, non hai indovinato</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose} variant="primary">
          Vai al round successivo
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResult;
