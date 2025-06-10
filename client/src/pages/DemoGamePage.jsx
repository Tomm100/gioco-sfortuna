import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Spinner, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import RoundPrompt from '../components/RoundPrompt.jsx';
import ModalResultRound from '../components/ModalResultRound.jsx';
import API from '../API/API.mjs';
import CardModel from '../models/CardModel.mjs';

function DemoGamePage() {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState(null);
  const [cards, setCards] = useState([]);
  const [nextCard, setNextCard] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const setupDemoGame = async () => {
      try {
        const demoGame = await API.createDemoGame();
        setGameId(demoGame.gameId);
        const initial = demoGame.initialCards.map(
          (c) => new CardModel(c.id, c.name, c.image, c.badluck)
        ).sort((a, b) => a.badluck - b.badluck);
        setCards(initial);
        const card = await API.getNextDemoCard(demoGame.gameId);
        setNextCard(card);
      } catch (err) {
        console.error("Errore inizializzazione demo:", err);
      } finally {
        setLoading(false);
      }
    };
    setupDemoGame();
  }, []);

  const handleGuess = async (position) => {
    try {
      let result;
      if (position === null) {
        result = await API.guessCardDemoTimeout(gameId, nextCard.id);
      } else {
        result = await API.guessDemoCard(gameId, nextCard.id, position);
      }
      setResultData(result);
      setShowResult(true);
    } catch (err) {
      console.error("Errore nel guess demo:", err);
    }
  };

  const handleCloseResult = () => {
    navigate(`/demo/game/${gameId}/summary`);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Caricamento partita demo...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      

      <Row>
        <Col>
          {nextCard && (
            <RoundPrompt
              cards={cards}
              nextCard={nextCard}
              onGuess={handleGuess}
              timeout={30}
              roundNum={1}
              wrongGuesses={0}
              paused={showResult}
            />
          )}
        </Col>
      </Row>

      {showResult && (
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <ModalResultRound
              correct={resultData.result === 'correct'}
              onClose={handleCloseResult}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default DemoGamePage;
