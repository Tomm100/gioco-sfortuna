// src/components/game/RoundPrompt.jsx
import React, { useEffect, useState } from 'react';
import {  Row, Col, Container } from 'react-bootstrap';
import Timer from './Timer.jsx';
import CardItem from './CardItem.jsx';
import GameBoard from './GameBoard.jsx';
function RoundPrompt(props) { // cards, nextCard, onGuess, timeout = 30
  const [timeLeft, setTimeLeft] = useState(props.timeout);


  useEffect(() => {
    setTimeLeft(props.timeout);   // il timer viene riavviato ogni volta che cambia la carta da indovinare
  }, [props.nextCard, props.timeout]);

  useEffect(() => {

    if (props.paused){   // se true, blocca il timer (il giocatore ha fatto la scelta ed il model è aperto)
      return; 
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(interval);
      props.onGuess(null);       // se scaffa il timer, il giocatore non ha indovinato
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleClickPosition = (pos) => {
    props.onGuess(pos);        // chiama la funzione onGuess passata come prop con la posizione scelta
  };

  return (
   
       

       
    <Container className="py-4">
      {/* ---------------------------------------------------
          CARTA DA INDOVINARE
          --------------------------------------------------- */}
      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <h5 className="fw-bold text-primary text-center">
            Carta da indovinare
          </h5>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <CardItem
            image={props.nextCard.image}
            name={props.nextCard.name}
            badluck={props.nextCard.badluck}
          />
        </Col>
      </Row>

      {/* ---------------------------------------------------
          TIMER e SCRITTA ROUND/SBAGLIATE (stessa larghezza del box)
          --------------------------------------------------- */}
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* 1) Timer a sinistra */}
            <Timer timeLeft={timeLeft} />

            {/* 2) Testo “Round / Sbagliate” allineato a destra */}
            <span className="fw-bold">
              Round: {props.roundNum} &ensp; Sbagliate: {props.wrongGuesses}
            </span>
          </div>

          {/* ---------------------------------------------------
              BOX “LE TUE CARTE” (sotto lo stesso contenitore)
              --------------------------------------------------- */}
          <div className="p-3 border rounded shadow-sm bg-light text-center">
            <h5 className="fw-semibold text-secondary mb-3">Le tue carte</h5>
            <GameBoard cards={props.cards} onGuess={props.onGuess} />
          </div>
        </Col>
      </Row>
    </Container>
       
        

      
       
  );
}

export default RoundPrompt;
