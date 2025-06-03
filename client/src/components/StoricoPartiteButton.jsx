// StoricoPartiteButton.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function StoricoPartiteButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline-secondary"
      size="lg"
      onClick={() => navigate("/user/storico")}
    >
      Storico Partite
    </Button>
  );
}

export default StoricoPartiteButton;
