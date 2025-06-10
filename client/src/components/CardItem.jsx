// src/components/game/CardItem.jsx
import { Card, Badge, Container, Row } from 'react-bootstrap';

function CardItem(props) { // props: { name, image, badluck }
  return (
    <Card 
      className="text-center flex-shrink-0" 
      style={{ 
        width: '140px', 
        height: '220px'
      }}
    >{props.image !== undefined && 
      <Card.Img
        variant="top"
        src={`http://localhost:3001/public/${props.image}`}
        className="w-100"
        style={{ height: '80px', objectFit: 'cover' }}
      />}

      <Card.Body className="d-flex flex-column justify-content-between p-2">
        <Card.Text className="small">{props.name}</Card.Text>

        {props.badluck !== undefined && (
          <Container className="mt-auto">
            <Row className="justify-content-center">
              <Badge bg="danger">{props.badluck.toFixed(1)}</Badge>
            </Row>
          </Container>
        )}
      </Card.Body>
    </Card>
  );
}

export default CardItem;