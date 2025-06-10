import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function RegolePage() {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h1 className="display-4 text-center mb-4"
          style={{
    fontFamily: 'Trebuchet MS'}}>📜 Regole del Gioco</h1>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>🎯 Obiettivo</Card.Title>
              <Card.Text>
                Ottieni 6 carte collocando correttamente nuove situazioni orribili in una scala della sfortuna da 1 a 100. Attenzione: dopo 3 errori, la partita termina!
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>🃏 Le Carte</Card.Title>
              <Card.Text>
                Ogni carta rappresenta una situazione orribile con:
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>• Una descrizione della situazione orribile</ListGroup.Item>
                <ListGroup.Item>• Un'immagine rappresentativa</ListGroup.Item>
                <ListGroup.Item>• Un indice di sfortuna unico 
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>🕹️ Svolgimento della Partita</Card.Title>
              <Card.Text>Ogni partita segue queste fasi:</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>1.  Inizi con 3 carte casuali, visibili e ordinate per sfortuna</ListGroup.Item>
                <ListGroup.Item>2. Ad ogni round ricevi una nuova situazione da posizionare tra le tue carte</ListGroup.Item>
                <ListGroup.Item>3. Hai 30 secondi per scegliere dove inserirla</ListGroup.Item>
                <ListGroup.Item>4. Se la posizione è corretta, ottieni la carta. Altrimenti, perdi il round</ListGroup.Item>
                <ListGroup.Item>5. Vinci se collezioni 6 carte, perdi con 3 errori</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>👤 Utenti Registrati</Card.Title>
              <Card.Text>
                Possono giocare partite complete, accedere al proprio profilo e consultare la cronologia dettagliata delle partite con esito e carte raccolte.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>🌐 Utenti Anonimi</Card.Title>
              <Card.Text>
                Possono giocare solo partite demo (1 round) e visualizzare queste regole. Nessuna cronologia è salvata.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>🧐 Altri Dettagli</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>• Se il tempo scade senza risposta, il round è perso</ListGroup.Item>
                <ListGroup.Item>• Le carte già usate non vengono ripresentate</ListGroup.Item>
                <ListGroup.Item>• Dopo ogni round, viene mostrato un messaggio di esito prima di proseguire</ListGroup.Item>
                <ListGroup.Item>• Alla fine viene mostrato un riepilogo delle carte raccolte</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegolePage;