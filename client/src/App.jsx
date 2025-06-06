import React from 'react';
import { Route, Routes, Navigate} from 'react-router';
import DefaultLayout from './components/DefaultLayout.jsx';
import { useState, useEffect } from 'react';
import API from './API/API.mjs';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import UserPage from './pages/UserPage.jsx';
import GamePage from './pages/GamePage.jsx';
import GameSummary from './pages/GameSummary.jsx';

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');


  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
      setUser(user);
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
      setUser(user);
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };




  return (
    <>
    <Routes>
    <Route path = 'user/game/:gameId' element={loggedIn ? <GamePage></GamePage>  : <Navigate replace to='/login' />} />
        <Route element={ <DefaultLayout loggedIn={loggedIn} handleLogout={handleLogout} message={message} setMessage={setMessage}  /> } >
            
            <Route  path='/'element= {!loggedIn ? <HomePage ></HomePage> : <Navigate replace to="/user"></Navigate>}></Route>
            <Route path='/regole' element={<div>Regole</div>}></Route>
            <Route path='/demo' element={<div>Demo</div>}></Route>
             <Route path='/login' element={loggedIn ? <Navigate replace to='/user' /> : <LoginPage handleLogin={handleLogin} />} />
            <Route path='/user' element={loggedIn ? <UserPage user={user} /> : <Navigate replace to='/login' />} />
            
                        
            <Route path = '/user/game/:gameId/summary' element={loggedIn ? <GameSummary></GameSummary> : <Navigate replace to='/login' />} />

            <Route path='/user/storico' element={loggedIn ? <div>Storico</div> : <Navigate replace to='/login' />} />
            <Route path='*' element={<div>Page not found</div>}></Route>
        </Route>
        

    </Routes>
     
    </>
  )
}

export default App;
