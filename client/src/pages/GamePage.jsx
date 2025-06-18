import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';

import RoundPrompt from '../components/RoundPrompt.jsx';
import ModalResultRound from '../components/ModalResultRound.jsx';

import API from '../API/API.mjs';
import CardModel from '../models/CardModel.mjs'; 

function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [nextCard, setNextCard] = useState(null);
  const [roundNum, setRoundNum] = useState(1);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [roundLoading, setRoundLoading] = useState(false);
  const [error, setError] = useState('');
  const [roundStarted, setRoundStarted] = useState(false); // 👈 nuovo

  useEffect(() => {
    const loadInitial = async () => {
      try {
        const gameStats = await API.getGameStats(gameId);
        const playerCards = gameStats.playerCards.map(
          (card) => new CardModel(card.id, card.name, card.image, card.badluck)
        ).sort((a, b) => a.badluck - b.badluck);

        setCards(playerCards);
        setRoundNum(gameStats.roundNumber);
        setWrongGuesses(gameStats.wrongGuesses);

        if (gameStats.status === 'lost' || gameStats.status === 'won') {
          navigate(`/user/game/${gameId}/summary`);
          return;
        }
      } catch (err) {
        console.error('Errore loading game:', err);
        setError('Errore durante il caricamento della partita. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, [gameId, navigate]);

  const handleStartRound = async () => {
    try {
      setRoundLoading(true);
      const card = await API.getNextCard(gameId);
      setNextCard(card);
      setRoundStarted(true);
      setRoundLoading(false);
    } catch (err) {
      setError('Errore nel recupero della carta del round.');
      setRoundLoading(false);
    }
  };

  const handleGuess = async (position) => {
    try {
      let response;
      if (position === null) {
        response = await API.guessCardTimeout(gameId, nextCard.id);
      } else {
        response = await API.guessCard(gameId, nextCard.id, position);
      }
      setResultData(response);
      setShowResult(true);
    } catch (err) {
      setError('Errore durante il tentativo. Riprova più tardi.');
    }
  };

  const onCloseResult = async () => {
    setShowResult(false);

    if (resultData.result === 'correct') {
      const newCards = [
        ...cards,
        new CardModel(nextCard.id, nextCard.name, nextCard.image, resultData.card.badluck)
      ];

      newCards.sort((a, b) => a.badluck - b.badluck);
      setCards(newCards);
      setRoundNum((prev) => prev + 1);

      if (newCards.length >= 6) {
        navigate(`/user/game/${gameId}/summary`);
        return;
      }

    } else {
      setWrongGuesses(resultData.wrongGuesses);
      setRoundNum((prev) => prev + 1);

      if (resultData.wrongGuesses >= 3) {
        navigate(`/user/game/${gameId}/summary`);
        return;
      }
    }

    try {
      setRoundLoading(true);
      const next = await API.getNextCard(gameId);
      setNextCard(next);
      setRoundLoading(false);
    } catch (err) {
      console.error('Errore nel recupero della prossima carta.', err);
      setError('Errore nel recupero della prossima carta.');
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Caricamento partita…</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Row className="justify-content-center mt-3">
          <Col xs="auto">
            <Button variant="secondary" onClick={() => navigate('/user')}>
              Torna al profilo
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-4">

      {!roundStarted && (
  <ModalResultRound firstRoundIntro={true} onClose={handleStartRound} />
)}


      {roundLoading && (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Preparazione round...</p>
        </div>
      )}

      {roundStarted && nextCard && (
        <RoundPrompt
          cards={cards}
          nextCard={nextCard}
          onGuess={handleGuess}
          timeout={30}
          roundNum={roundNum}
          wrongGuesses={wrongGuesses}
          paused={showResult}
        />
      )}

      {showResult && (
        <ModalResultRound
          correct={resultData.result === 'correct'}
          onClose={onCloseResult}
        />
      )}
    </Container>
  );
}

export default GamePage;
