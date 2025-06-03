import React from "react";
import { Container, Card } from "react-bootstrap";
import IniziaPartitaButton from "../components/IniziaPartitaButton";
import StoricoPartiteButton from "../components/StoricoPartiteButton";

function UserPage(props) {
  // Esempio di struttura user: { name: "Mario", email: "mario@example.com" }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="p-5 shadow-lg text-center" style={{ maxWidth: 600, width: "100%" }}>
        <h2 className="mb-3">Ciao, {props.user?.name || "Giocatore"}!</h2>

        {props.user?.email && (
          <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
            Email: {props.user.email}
          </p>
        )}

        <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
          <IniziaPartitaButton />
          <StoricoPartiteButton />
        </div>
      </Card>
    </Container>
  );
}

export default UserPage;
