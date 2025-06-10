import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CardItem from './CardItem.jsx'; 


// Utilizzato per il riepilogo di una partita appena completata

function CardsSummaryBox(props) { // cards
 

  return (
    <Card className="p-4 shadow-sm rounded-4 mb-4 bg-light">
      <h4 className="text-center mb-4">Carte Conquistate</h4>
      <Row xs={2} sm={3} md={4} lg={6} className="g-3 justify-content-center">
        {props.cards.map((card, index) => (
          <Col key={card.id || index}>
            <CardItem name={card.name} image={card.image} badluck={card.badluck} />
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default CardsSummaryBox;
