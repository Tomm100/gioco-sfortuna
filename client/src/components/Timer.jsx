// src/components/game/Timer.jsx
import React from 'react';
import { Badge } from 'react-bootstrap';

function Timer(props) { // timeleft
  return (
    <div className="d-flex justify-content-center mb-2">
      <Badge
        bg="danger"
        text="light"
        className="fs-5 fw-bold px-3 py-2"
        style={{ minWidth: '7rem' }}
      >
        Tempo rimasto: {props.timeLeft}s
      </Badge>
    </div>
  );
}

export default Timer;
