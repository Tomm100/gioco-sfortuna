import React from "react";
import { Container, Card } from "react-bootstrap";
import IniziaPartitaButton from "../components/IniziaPartitaButton";
import StoricoPartiteButton from "../components/StoricoPartiteButton";

function UserPage(props) {
  

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card className="p-5 shadow-lg text-center" style={{ maxWidth: 600, width: "100%" }}>
        {props.user.name && (<h2 className="mb-3">Ciao, {props.user.name}!</h2>)}

       
      <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
          <IniziaPartitaButton />
          <StoricoPartiteButton />
        </div>
      </Card>
    </Container>
  );
}

export default UserPage;
