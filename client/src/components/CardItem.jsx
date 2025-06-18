import { Card, Badge, Container, Row } from 'react-bootstrap';

function CardItem(props) { // props: { name, image, badluck }
  return (
    <Card 
      className="text-center flex-shrink-0 shadow-sm" 
      style={{ 
        width: '140px',
        height: '240px',
        borderRadius: '8px'
      }}
    >
      {props.image !== undefined && (
        <div
          style={{
            width: '100%',
            height: '90px',
            overflow: 'hidden',
            marginTop: '6px'
          }}
        >
          <Card.Img
            variant="top"
            src={`http://localhost:3001/public/${props.image}`}
            className="w-100 h-100"
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      <Card.Body className="d-flex flex-column justify-content-between px-2 pb-2 pt-1">
        {/* Testo centrato verticalmente */}
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <Card.Text
            className="small text-wrap"
            style={{ fontSize: '0.8rem', lineHeight: '1.05rem', textAlign: 'center' }}
          >
            {props.name}
          </Card.Text>
        </div>

        {/* Badge finale */}
        {props.badluck !== undefined && (
          <Container className="mt-1">
            <Row className="justify-content-center">
              <Badge bg="danger" className="px-3 py-1">
                {props.badluck.toFixed(1)}
              </Badge>
            </Row>
          </Container>
        )}
      </Card.Body>
    </Card>
  );
}

export default CardItem;
