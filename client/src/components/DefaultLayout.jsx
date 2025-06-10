
import React from 'react';
import { Outlet } from 'react-router';
import NavHeader from './NavHeader';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert } from 'react-bootstrap';




function DefaultLayout(props) {
    return (
        <>
        <NavHeader loggedIn={props.loggedIn} handleLogout={props.handleLogout}></NavHeader>
        
        
        
            
            <Outlet />
          


        
    </>

);
}  


export default DefaultLayout;