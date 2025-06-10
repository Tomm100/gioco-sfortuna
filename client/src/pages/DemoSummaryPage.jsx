import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import API from '../API/API.mjs';
import { Container, Row, Col, Badge, Alert, Spinner, Button } from 'react-bootstrap';
import CardsSummaryBox from '../components/CardsSummaryBox.jsx';

function DemoSummaryPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameStats, setGameStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDemoGameStats = async () => {
      try {
        const stats = await API.getGameDemoStats(gameId);
        setGameStats(stats);
      } catch (err) {
        console.error('Errore caricamento stats demo:', err);
        setError('Errore nel caricamento della partita demo.');
      } finally {
        setLoading(false);
      }
    };
    fetchDemoGameStats();
  }, [gameId]);

  const handleBackToHome = () => navigate('/');
  const handleStartNewDemo = () => navigate('/demo');
  const handleGoToLogin = () => navigate('/login');

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Caricamento riepilogo demo...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={handleBackToHome}>
          Torna alla Home
        </Button>
      </Container>
    );
  }

  const sortedCards = gameStats?.playerCards?.sort((a, b) => a.badluck - b.badluck) || [];

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <div className="text-center mb-4">
            <h1 className="display-4">
              {gameStats.gameStatus === 'won' ? '🎉 Round Vinto!' : '😔 Round Perso'}
            </h1>
            <p className="lead">
              {gameStats.gameStatus === 'won'
                ? 'Hai posizionato correttamente la carta.'
                : 'Non sei riuscito a posizionare la carta correttamente.'}
            </p>
            <Badge
              bg={gameStats.gameStatus === 'won' ? 'success' : 'danger'}
              className="fs-6"
            >
              Carte raccolte: {gameStats.playerCards?.length || 0}/4
            </Badge>
          </div>
        </Col>
      </Row>

      {gameStats.playerCards && gameStats.playerCards.length > 0 && (
        <CardsSummaryBox cards={sortedCards} />
      )}

      <Row className="mt-5 justify-content-center gap-3">
        <Col xs="auto">
          <Button variant="primary" onClick={handleStartNewDemo}>
            🔁 Nuova demo
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={handleGoToLogin}>
            🔐 Effettua il login
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={handleBackToHome}>
            Torna alla Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DemoSummaryPage;
