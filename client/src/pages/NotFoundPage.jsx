import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1">404</h1>
      <p className="lead mb-4">Pagina non trovata</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Torna alla Home
      </Button>
    </Container>
  );
}
