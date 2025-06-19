import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import CardItem from './CardItem.jsx';

function GameBoard(props) {
  const handleCardClick = (index) => {
    props.onGuess(index);
  };

  return (
    <Row className="justify-content-center align-items-center g-2">
      {/* Prima posizione cliccabile */}
      <Col xs="auto">
        <Button 
          variant="success" 
          size="sm"
          onClick={() => handleCardClick(0)}
          style={{ minWidth: '60px' }}
        >
          Pos 0
        </Button>
      </Col>

      {props.cards.map((card, index) => (
        <React.Fragment key={card.id}>
          <Col xs="auto">
            <CardItem
              image={card.image}
              name={card.name}
              badluck={card.badluck}
            />
          </Col>
          
          {/* Posizione cliccabile dopo ogni carta */}
          <Col xs="auto">
            <Button 
              variant="success" 
              size="sm"
              onClick={() => handleCardClick(index + 1)}
              style={{ minWidth: '60px' }}
            >
              Pos {index + 1}
            </Button>
          </Col>
        </React.Fragment>
      ))}
    </Row>
  );
}

export default GameBoard;