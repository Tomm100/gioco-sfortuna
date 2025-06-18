import {useState} from "react";
import { useNavigate } from "react-router";
import { Container, Button, Stack, Row, Col, Card } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; // icone Bootstrap
import NewDemoGameModal from '../components/NewDemoGameModal.jsx';

/**
 * StartGamePage – hero + sezione modalità di gioco
 * --------------------------------------------------------------
 * Ridotto lo spazio verticale tra la hero e le card:
 *  ▸ Rimosso `min-vh-100` e sostituito con un padding top/bottom più
 *    contenuto (py-5) mantenendo l'allineamento centrale.
 */
function HomePage(props) {
  const navigate = useNavigate();
  const primaryColor = "#6c3cf0"; // viola brand
  const [showDemoModal, setShowDemoModal] = useState(false);


  /* ---------------- Helper Card component -------------------- */
  

  return (
    <div style={{ backgroundColor: "#f7f8fa" }}>
      {/* HERO ----------------------------------------------------- */}
      <section className="d-flex flex-column justify-content-center align-items-center pt-2">
        <Container className="text-center px-4">
          <h1
            className="fw-bold mb-4"
            style={{ color: primaryColor, fontSize: "3.5rem", lineHeight: 1.1 }}
          >
            Stuff Happens
          </h1>

          <p className="lead mx-auto " style={{ maxWidth: 720 }}>
            Metti alla prova il tuo intuito ordinando le situazioni più terribili su una scala della
            sfortuna. Riesci a indovinare quali disgrazie sono peggiori delle altre?
          </p>

          </Container>
      </section>

    <Container className="d-flex justify-content-center py-4">
    <Button
              size="lg"
              variant="outline-secondary"
              className="px-4 py-3 d-flex align-items-center gap-2"
              onClick={() => navigate("/regole")}
            >
              <i className="bi bi-question-circle fs-5"></i>
              Regole del gioco
            </Button>
       </Container>
      {/* MODALITÀ DI GIOCO ------------------------------------------ */}
      <section className="pb-5">
        <Container>
          <Row className="g-4 justify-content-center">
            {/* FULL GAME */}
            <Col xs={12} md={6} lg={5}>
              <ModeCard
                icon="bi-trophy"
                iconBg="#eaeffd"
                title="Full Game"
                ctaVariant="primary"
                ctaLabel="Effettua il login per giocare"
                onClick={() => navigate("/login")}
              >
                <p>Gioca l'esperienza completa di Stuff Happens! Raccogli 6 carte per vincere, ma fai attenzione: tre errori e sei fuori.</p>
                <ul className="mb-0 ps-3">
                  <li>Parti con 3 carte casuali</li>
                  <li>Continua finché non ne collezioni 6 o sbagli 3 volte</li>
                  <li>Traccia la cronologia partite nel tuo profilo</li>
                  
                </ul>
              </ModeCard>
            </Col>

            {/* DEMO ROUND */}
            <Col xs={12} md={6} lg={5}>
              <ModeCard
                icon="bi-clock"
                iconBg="#f1f2f4"
                title="Demo Round"
                ctaVariant="outline-secondary"
                ctaLabel="Prova un round demo"
                onClick={() => setShowDemoModal(true)}
              >
                <p>Prova un rapido round demo per capire il gioco. Nessun login richiesto</p>
                <ul className="mb-0 ps-3">
                  <li>Parti con 3 carte casuali</li>
                  <li>Un solo round per imparare le meccaniche</li>
                  <li>Nessun account necessario</li>
                  
                </ul>
              </ModeCard>
            </Col>
          </Row>
        </Container>
      </section>
      <NewDemoGameModal show={showDemoModal} onHide={() => setShowDemoModal(false)} />
      
    </div>
  );
}



function ModeCard (props)  {
  const navigate = useNavigate();
  const primaryColor = "#6c3cf0";
    return (
    <Card className="shadow-sm h-100 border-0">
      <Card.Body className="p-4 d-flex flex-column">
        {/* Icona circolare */}
        <div
          className="d-inline-flex align-items-center justify-content-center mb-3 rounded-circle"
          style={{ width: 64, height: 64, backgroundColor: props.iconBg }}
        >
          <i className={`bi ${props.icon}`} style={{ fontSize: 28, color: primaryColor }}></i>
        </div>

        <Card.Title as="h3" className="fw-bold mb-3" style={{ fontSize: "1.5rem" }}>
          {props.title}
        </Card.Title>

        <div className="mb-4" style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
          {props.children}
        </div>

        <Button
          variant={props.ctaVariant}
          size="lg"
          className={`mt-auto w-100 d-flex align-items-center gap-2 ${props.ctaVariant === "primary" ? "text-white" : ""}`}
          style={props.ctaVariant === "primary" ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
          onClick={props.onClick}
        >
          <i className="bi bi-play-fill fs-4"></i>
          {props.ctaLabel}
        </Button>
      </Card.Body>
    </Card>
    
  );
}
export default HomePage;