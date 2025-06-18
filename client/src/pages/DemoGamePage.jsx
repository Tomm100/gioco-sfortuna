import { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router';
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import RoundPrompt from '../components/RoundPrompt.jsx';
import ModalResultRound from '../components/ModalResultRound.jsx';
import API from '../API/API.mjs';
import CardModel from '../models/CardModel.mjs';

function DemoGamePage() {
  
  const { gameId } = useParams();

  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [nextCard, setNextCard] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roundLoading, setRoundLoading] = useState(false);

  
  useEffect(() => {
  const loadDemoGame = async () => {
    try {
      const gameStats = await API.getGameDemoStats(gameId);
      console.log(gameStats);
      const initial = gameStats.playerCards.map(
        (c) => new CardModel(c.id, c.name, c.image, c.badluck)
      ).sort((a, b) => a.badluck - b.badluck);
      setCards(initial);
    } catch (err) {
      console.error("Errore nel caricamento della partita demo:", err);
    } finally {
      setLoading(false);
    }
  };
  loadDemoGame();
}, [gameId]);

  const startFirstRound = async () => {
    setShowStartModal(false);
    setRoundLoading(true);
    try {
      const card = await API.getNextDemoCard(gameId);
      setNextCard(card);
    } catch (err) {
      console.error('Errore caricamento carta demo:', err);
    } finally {
      setRoundLoading(false);
    }
  };

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

  return (
    <Container className="mt-4 text-center">
      {loading ? (
        <>
          <Spinner animation="border" />
          <p>Caricamento partita demo...</p>
        </>
      ) : roundLoading ? (
        <>
          <Spinner animation="border" />
          <p>Preparazione round...</p>
        </>
      ) : (
        <>
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
        </>
      )}

      {/* Modal iniziale */}
      {showStartModal && (
        <ModalResultRound firstRoundIntro={true} onClose={startFirstRound} />
      )}

      {/* Modal risultato */}
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
