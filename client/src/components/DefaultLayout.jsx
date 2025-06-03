
import React from 'react';
import { Outlet } from 'react-router';
import NavHeader from './NavHeader';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';




function DefaultLayout(props) {
    return (
        <>
        <NavHeader loggedIn={props.loggedIn} handleLogout={props.handleLogout}></NavHeader>
        
        {props.message && (
        <Container fluid className="pt-5 mt-5">
             
              <Row className="justify-content-center px-3">
                <Alert
                  variant={props.message.type}
                  onClose={() => props.setMessage('')}
                  dismissible
                  className="w-auto"
                >
                  {props.message.msg}
                </Alert>
              </Row>
            </Container>
        )}
        
            
            <Outlet />
          


        
    </>

);
}  


export default DefaultLayout;