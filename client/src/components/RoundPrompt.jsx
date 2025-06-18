import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Stack, Card } from 'react-bootstrap';
import Timer from './Timer.jsx';
import CardItem from './CardItem.jsx';
import GameBoard from './GameBoard.jsx';

function RoundPrompt(props) {
  const [timeLeft, setTimeLeft] = useState(props.timeout);

  useEffect(() => {
    setTimeLeft(props.timeout);
  }, [props.nextCard, props.timeout]);

  useEffect(() => {
    if (props.paused) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(interval);
      props.onGuess(null);
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleClickPosition = (pos) => {
    props.onGuess(pos);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start py-5"
      style={{ minHeight: '100vh' }}
    >
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: '1300px', backgroundColor: '#fdfdfd', borderRadius: '12px' }}>
        <Row className="gx-4 gy-4 align-items-stretch">
          {/* Colonna sinistra - GameBoard + info */}
          <Col lg={8} className="d-flex flex-column">
            <Card className="p-3 border-0 shadow-sm bg-light h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="fw-semibold">Round: {props.roundNum}</div>
                <div className="fw-semibold">Sbagliate: {props.wrongGuesses}</div>
              </div>
              <h5 className="fw-semibold text-secondary mb-3 text-center">Le tue carte</h5>
              <div className="px-2" style={{ overflowX: 'auto' }}>
                <GameBoard cards={props.cards} onGuess={handleClickPosition} />
              </div>
            </Card>
          </Col>

          {/* Colonna destra - Carta da indovinare con timer sotto */}
          <Col lg={4} className="d-flex">
            <Card className="p-4 border-0 shadow bg-white d-flex flex-column align-items-center justify-content-center w-100" style={{ width: '100%' }}>
              <h4 className="fw-bold text-primary mb-3 text-center">Carta da indovinare</h4>
              <div style={{ transform: 'scale(1.1)', transition: 'transform 0.2s ease-in-out' }}>
                <CardItem
                  image={props.nextCard.image}
                  name={props.nextCard.name}
                  badluck={props.nextCard.badluck}
                />
              </div>
              <div className="text-center mt-4">
                <Timer timeLeft={timeLeft} />
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default RoundPrompt;
