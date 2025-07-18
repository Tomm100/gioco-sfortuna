const SERVER_URL = "http://localhost:3001";


const logIn = async (credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });
  const user = await response.json();
  if (response.ok) {
    return user;
  } else {
    throw user;  
  }
};

const logOut = async() => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include'
  });
  if (response.ok)
    return null;
}

const createGame = async () => {
  const response = await fetch(SERVER_URL + '/api/user/game', {
    method: 'POST',
    credentials: 'include',
  });
  if (response.ok) {
    const game = await response.json();
    return game;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};

const getGameStats = async (gameId) => {
  const response = await fetch(SERVER_URL + `/api/user/game/${gameId}`, {
    credentials: 'include',
  });
  if (response.ok) {
    const stats = await response.json();
    return stats;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};


const getNextCard = async (gameId) => {
  const response = await fetch(SERVER_URL + `/api/user/game/${gameId}/next`, {
    credentials: 'include',
  });
  if (response.ok) {
    const card = await response.json();
    return card;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}


const guessCard = async (gameId, cardId, posizione) => {

  const response = await fetch(SERVER_URL + `/api/user/game/${gameId}/guess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ cardId, position: posizione }),
  });
  if (response.ok) {
    const result = await response.json();
    return result; 
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }


}

const guessCardTimeout = async (gameId, cardId) => {  
  const response = await fetch(SERVER_URL + `/api/user/game/${gameId}/timeout`, {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({cardId}), 
  });
  if (response.ok) {
    const result = await response.json();
    return result; 
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getUserGamesHistory = async () => {
  const response = await fetch(SERVER_URL + '/api/user/games', {
    credentials: 'include',
  });
  if (response.ok) {
    const games = await response.json();
    return games; 
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}



const createDemoGame = async () =>{
    const response = await fetch(SERVER_URL + '/api/demo/game', {
    method: 'POST',
    
  });
  if (response.ok) {
    const game = await response.json();
    return game;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}
const getNextDemoCard = async (gameId) => {
  const response = await fetch(SERVER_URL + `/api/demo/game/${gameId}/next`, {
    
  });
  if (response.ok) {
    const card = await response.json();
    return card;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const guessDemoCard = async (gameId, cardId, posizione) => {

  const response = await fetch(SERVER_URL + `/api/demo/game/${gameId}/guess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cardId, position: posizione }),
  });
  if (response.ok) {
    const result = await response.json();
    return result; 
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}


const guessCardDemoTimeout = async (gameId, cardId) => {  
  const response = await fetch(SERVER_URL + `/api/demo/game/${gameId}/timeout`, { 
    method: 'POST',
   headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({cardId}), 
  });
  if (response.ok) {
    const result = await response.json();
    return result; 
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}


const getGameDemoStats = async (gameId) => {
  const response = await fetch(SERVER_URL + `/api/demo/game/${gameId}`, {
    
  });
  if (response.ok) {
    const stats = await response.json();
    return stats;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
};



const API ={logIn, getUserInfo, logOut, createGame, getGameStats, getNextCard, 
  guessCard, guessCardTimeout, getUserGamesHistory, createDemoGame, getNextDemoCard,
  guessCardDemoTimeout, guessDemoCard, getGameDemoStats
};
export default API;