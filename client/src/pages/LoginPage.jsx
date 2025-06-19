import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { LoginForm } from '../components/AuthComponents.jsx'; 

function LoginPage(props) {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>
          <Card className="shadow rounded-4 p-4">
            
            <LoginForm handleLogin={props.handleLogin} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;





