import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NewGameModal from "./NewGameModal.jsx"; 

function IniziaPartitaButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
        Inizia Partita
      </Button>

      <NewGameModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default IniziaPartitaButton;
