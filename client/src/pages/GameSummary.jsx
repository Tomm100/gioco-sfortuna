
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import API from '../API/API.mjs';
import { Container, Row, Col, Badge, Alert, Spinner, Button } from 'react-bootstrap';
import CardsSummaryBox from '../components/CardsSummaryBox.jsx';
import IniziaPartitaButton from '../components/IniziaPartitaButton.jsx'; 


function GameSummary(){
    
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameStats, setGameStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [startingNewGame, setStartingNewGame] = useState(false);
    

   useEffect(() => {
    const loadGameStats = async () => {
      try {
        setLoading(true);
        
        const stats = await API.getGameStats(gameId);
       
       
        setGameStats(stats);

      } catch (err) {
        setError('Errore nel caricamento del riepilogo della partita');
        console.error('Error fetching game stats:', err);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      loadGameStats();
    }
  }, [gameId]);


  const handleBackToHome = () => {
    navigate('/');
  }


  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <Spinner animation="border" role="gameStatus" className="mb-3">
            <span className="visually-hidden">Caricamento...</span>
          </Spinner>
          <p>Caricamento riepilogo partita...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          {error}
        </Alert>
        <Button variant="primary" onClick={handleBackToHome}>
          Torna alla Home
        </Button>
      </Container>
    );
  }

  if (!gameStats) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          Nessun dato della partita disponibile.
        </Alert>
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
              {gameStats.gameStatus === 'won' ? '🎉 Partita Vinta!' : '😔 Partita Persa'}
            </h1>
            <p className="lead">
              {gameStats.gameStatus === 'won' 
                ? `Complimenti! Hai raccolto tutte le 6 carte.`
                : `Hai perso dopo ${gameStats.wrongGuesses || 3} tentativi sbagliati.`
              }
            </p>
            <Badge 
              bg={gameStats.gameStatus === 'won' ? 'success' : 'danger'} 
              className="fs-6"
            >
              Carte raccolte: {gameStats.playerCards?.length || 0}/6
            </Badge>
          </div>
        </Col>
      </Row>

      {gameStats.playerCards && gameStats.playerCards.length > 0 && (
        <CardsSummaryBox cards={sortedCards}></CardsSummaryBox>
      )}

      

      {gameStats.gameStatus === 'won' && (
        <Row className="mt-4">
          <Col>
            <Alert variant="success" className="text-center">
              <Alert.Heading>Ottimo lavoro! 🌟</Alert.Heading>
              <p>
                Sei riuscito a completare la partita raccogliendo tutte le 6 carte delle situazioni più sfortunate.
                </p>
            </Alert>
          </Col>
        </Row>
      )}



          <Row className="mt-5">
      <Col className="d-flex justify-content-center gap-3">
        <IniziaPartitaButton />
        <Button variant="secondary" onClick={handleBackToHome}>
          Torna alla Home
        </Button>
      </Col>
    </Row>

    </Container>

    



    );

}


export default GameSummary;