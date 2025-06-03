// IniziaPartitaButton.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function IniziaPartitaButton() {
  const navigate = useNavigate();

  return (

    
    <Button
      variant="primary"
      size="lg"
      onClick={() => navigate("/user/game")}
    >
      Inizia Partita
    </Button>
  );
}

export default IniziaPartitaButton;
