



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
    throw user;  // an object with the error coming from the server
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
    return result; // { result: 'correct' | 'wrong', card: { id, name, img, badluck }, numPlayerCards: number, gameStatus: 'ongoing' | 'won' | 'lost' }
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }


}

const guessCardTimeout = async (gameId, cardId) => {  // <-- Aggiungi cardId come parametro
  const response = await fetch(SERVER_URL + `/api/user/game/${gameId}/timeout`, {  // <-- Cambia endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({cardId}), // Ora cardId è definito
  });
  if (response.ok) {
    const result = await response.json();
    return result; // { result: 'wrong', gameStatus: 'ongoing' | 'lost', wrongGuesses: number }
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
    return games; // [{ gameId, status, createdAt, completedAt, totalCardsCollected, cards: [{ id, name, image, badluck }] }]
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}



const createDemoGame = async () =>{
  
}


const API ={logIn, getUserInfo, logOut, createGame, getGameStats, getNextCard, guessCard, guessCardTimeout, getUserGamesHistory};
export default API;