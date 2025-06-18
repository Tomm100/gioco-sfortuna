import { Modal, Button } from 'react-bootstrap';

function ModalResultRound(props) {
  const isIntro = props.firstRoundIntro;

  return (
    <Modal show={true} centered backdrop="static">
      <Modal.Header>
        <Modal.Title className="text-center w-100">
          {isIntro
            ? '🎮 Inizio Partita 🎮'
            : props.correct
            ? '🎉 Round vinto! 🎉'
            : '😔 Round perso 😔'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isIntro ? (
          <p>Sei pronto a iniziare il primo round? Hai 30 secondi per ogni carta. Buona fortuna!</p>
        ) : props.correct ? (
          <p>Hai posizionato correttamente la carta.</p>
        ) : (
          <p>Peccato, non hai indovinato.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onClose} variant="primary">
          {isIntro ? 'Inizia il Round' : 'Prossimo Round'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalResultRound;
