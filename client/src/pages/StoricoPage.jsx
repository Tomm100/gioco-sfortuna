import { useState, useEffect } from "react";
import API from "../API/API.mjs";
import { Container, Alert, Spinner, Accordion, Badge, Row, Col, ListGroup } from "react-bootstrap";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/it';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('it');

function StoricoPage() {
  const [gameHistory, setGameHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserGamesHistory = async () => {
      try {
        const games = await API.getUserGamesHistory();
        setGameHistory(games);
      } catch (err) {
        setError(err.message || 'Errore durante il caricamento.');
      } finally {
        setLoading(false);
      }
    };
    loadUserGamesHistory();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Caricamento cronologia...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (gameHistory.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <p>Non hai ancora completato nessuna partita.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🕓 Cronologia Partite</h2>

      <Accordion defaultActiveKey="0">
        {gameHistory.map((game, index) => (
          <Accordion.Item eventKey={index.toString()} key={game.gameId}>
            <Accordion.Header>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <strong>Partita {index + 1}</strong>{' '}
                  <Badge bg={game.status === 'won' ? 'success' : 'danger'}>
                    {game.status === 'won' ? 'VINTA' : 'PERSA'}
                  </Badge>
                </div>
                <div className="text-muted small ms-auto">
                  {dayjs.utc(game.startedAt).tz(dayjs.tz.guess()).format('DD/MM/YYYY, HH:mm')}
                </div>
              </div>
            </Accordion.Header>

            <Accordion.Body>
              <Row className="mb-3">
                <Col md={3}>
                  <strong>Esito:</strong>{' '}
                  <Badge bg={game.status === 'won' ? 'success' : 'danger'}>
                    {game.status === 'won' ? 'VINTA' : 'PERSA'}
                  </Badge>
                </Col>
                <Col md={3}>
                  <strong>Carte raccolte:</strong>{' '}
                  <Badge bg="primary">{game.totalCardsCollected}/6</Badge>
                </Col>
              </Row>

              <h6 className="mb-3">Carte coinvolte nella partita:</h6>
              
              <ListGroup variant="flush">
                {game.cards.map((card, idx) => (
                  <ListGroup.Item key={idx} className="px-0 py-2">
                    <Row className="align-items-center">
                      <Col>
                        <span>{card.name}</span>
                      </Col>
                      <Col xs="auto" className="text-end">
                        {card.isInitial ? (
                          <Badge bg="secondary" className="me-2">Iniziale</Badge>
                        ) : (
                          <Badge bg="primary" className="me-2">Round {card.roundNumber}</Badge>
                        )}
                        <Badge bg={card.isWon ? 'success' : 'danger'}>
                          {card.isWon ? 'Vinta' : 'Persa'}
                        </Badge>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

export default StoricoPage;