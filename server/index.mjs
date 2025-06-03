import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { getAllCards, getInitialCards, getRandomCards, getCardById } from './DAO/CardDAO.mjs';
import { createGame, getGameById, updateGameStatus } from './DAO/GamesDAO.mjs';
import { addInitialCards, getUsedCardIdsForGame, addGameCard, getPlayerCardsForGame, updateGameCardGuessed, countPlayerCards, countWrongGuesses, getRoundNumberForGame} from './DAO/RoundDAO.mjs';
import { getUser } from './DAO/UserDAO.mjs';

import { check, validationResult } from 'express-validator';
import e from 'express';
// per l'autenticazione

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

import { fileURLToPath } from 'url';


// init express
const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessState: 200,
  credentials: true
};

app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = __filename.slice(0, __filename.lastIndexOf('/'));
app.use(
  '/public',
  express.static( fileURLToPath(new URL('./public', import.meta.url)) )
);


passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));





// ROUTES 

app.get('/api/cards', (req, res) => {
  getAllCards()
    .then(cards => res.json(cards))
    .catch(err => {
      console.log('Errore durante il recupero delle carte:', err);
    res.status(500).json({ message: 'Errore interno al server' });
    });
});


app.get('/api/cards/initial', (req, res) => {
  getInitialCards()
    .then(cards => res.json(cards))
    .catch(err => {
      console.log('Errore durante il recupero delle carte iniziali:', err);
      res.status(500).json({ message: 'Errore interno al server' });
    });
});




/** 1) Creazione nuova partita **/
// POST /api/games
app.post('/api/game' , isLoggedIn ,async (req, res) => {
  try {
    console.log('Richiesta di creazione partita ricevuta');
    
    const userId = req.user.id;
    
    const gameId = await createGame(userId);
    // Pesco 3 carte iniziali e le aggiungo come "conquistate" (guessed = 1)
    const initialCards = await getRandomCards(3, []);    
    await addInitialCards(gameId, initialCards.map(c => c.id));
    
    return res.status(201).json({ gameId, initialCards });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Impossibile creare partita' });
  }
});

/** 2a) Richiedi nuova carta da indovinare **/
// GET /api/games/:gameId/next
app.get('/api/game/:gameId/next', isLoggedIn,  async (req, res) => {
  const gameId = +req.params.gameId;
  try {
    const game = await getGameById(gameId);
    if (!game || game.userId !== req.user.id)
      return res.status(404).json({ error: 'Partita non trovata' });
    if (game.status !== 'ongoing')
      return res.status(400).json({ error: 'Partita già conclusa' });
    
    // Prendo tutte le carte già usate (sia conquistate che sbagliate)
    const usedCards = await getUsedCardIdsForGame(gameId);
    const nextCard = await getRandomCards(1, usedCards).then(cards => cards[0]);
    
    // NON aggiungo la carta al database qui - la aggiungerò solo quando il giocatore fa il guess
    return res.json({
      id: nextCard.id,
      name: nextCard.name,
      image: nextCard.image,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});


/** 2b) Il giocatore invia il guess **/
// POST /api/games/:gameId/guess
app.post('/api/game/:gameId/guess'  , isLoggedIn, [
  check('cardId').isInt(),
  check('position').isInt({ min: 0 })
], async (req, res) => {

  // Controllo validità dei dati
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const gameId = +req.params.gameId;
  const { cardId, position } = req.body;
  try {
    const game = await getGameById(gameId);
    
    if (!game || game.userId !== req.user.id) 
      return res.status(404).json({ error: 'Partita non trovata' });
   
    // Recupera la carta del round
    const theCard = await getCardById(cardId);
    
    if (!theCard) 
      return res.status(404).json({ error: 'Carta non esistente' });

    // Recupera le carte conquistate dal giocatore (solo quelle con guessed = 1)
    const playerCards = await getPlayerCardsForGame(gameId);
    
    // Calcolo posizione corretta:
    let positionCorretto = 0;
    while (positionCorretto < playerCards.length &&
           playerCards[positionCorretto].badluck < theCard.badluck) {
      positionCorretto++;
    }

    // Calcolo roundNumber
    const nextRound = await getRoundNumberForGame(gameId) + 1;

    let won = false;
    if (position === positionCorretto) {
      won = true;
    }
   
    // Aggiungo la carta al database con il risultato
    if (won) {
      await addGameCard(gameId, cardId, nextRound);
      await updateGameCardGuessed(gameId, cardId, 1); // Conquistata
      
      const numWon = await countPlayerCards(gameId);
      
      // Se l'utente ha 6 carte conquistate, ha vinto
      if (numWon >= 6) {
        await updateGameStatus(gameId, 'won');
      }
      
      return res.json({
        result: 'correct',
        card: theCard,
        realIndex: positionCorretto,
        numPlayerCards: numWon,
        gameStatus: (numWon >= 6 ? 'won' : 'ongoing')
      });
    } else {
      await addGameCard(gameId, cardId, nextRound);
      await updateGameCardGuessed(gameId, cardId, 0); // Sbagliata
      
      const wrongCount = await countWrongGuesses(gameId);
      if (wrongCount >= 3) {
        await updateGameStatus(gameId, 'lost');
      }
      
      return res.json({
        result: 'wrong',
        realIndex: positionCorretto,
        gameStatus: (wrongCount >= 3 ? 'lost' : 'ongoing'),
        wrongGuesses: wrongCount
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

/** 2c) Timeout del timer **/
app.post('/api/game/:gameId/timeout', isLoggedIn, [
  check('cardId').isInt()
], async (req, res) => {
  // Controllo validità dei dati
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const gameId = +req.params.gameId;
  const { cardId } = req.body;
  
  try {
    const game = await getGameById(gameId);
    if (!game || game.userId !== req.user.id) 
      return res.status(404).json({ error: 'Partita non trovata' });

    // Calcolo roundNumber
    const nextRound = await getRoundNumberForGame(gameId) + 1;
    
    // Aggiungo la carta come sbagliata
    await addGameCard(gameId, cardId, nextRound);
    await updateGameCardGuessed(gameId, cardId, 0);
    
    const wrongCount = await countWrongGuesses(gameId);
    if (wrongCount >= 3) {
      await updateGameStatus(gameId, 'lost');
    }
    
    // Per il timeout, devo comunque restituire la posizione corretta per il modal
    const theCard = await getCardById(cardId);
    const playerCards = await getPlayerCardsForGame(gameId);
    
    let positionCorretto = 0;
    while (positionCorretto < playerCards.length &&
           playerCards[positionCorretto].badluck < theCard.badluck) {
      positionCorretto++;
    }
    
    return res.json({
      result: 'wrong',
      realIndex: positionCorretto,
      gameStatus: (wrongCount >= 3 ? 'lost' : 'ongoing'),
      wrongGuesses: wrongCount
    });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});

/** 3) Recupera lo stato della partita **/
app.get('/api/game/:gameId', isLoggedIn, async (req, res) => {
  const gameId = +req.params.gameId;
  try {
    const game = await getGameById(gameId);
    if (!game || game.userId !== req.user.id) {
      return res.status(404).json({ error: 'Partita non trovata' });
    }
    
    // Recupero solo le carte conquistate (guessed = 1)
    const initialCards = await getPlayerCardsForGame(gameId);
    const roundNumber = await getRoundNumberForGame(gameId);
    const wrongGuesses = await countWrongGuesses(gameId);
    
    return res.json({
      initialCards: initialCards,
      roundNumber: roundNumber,
      wrongGuesses: wrongGuesses,
      gameStatus: game.status
    });
  } catch (e) {
    console.error(e);
    return res.status(500).end();
  }
});





app.post('/api/sessions', passport.authenticate('local'), function(req, res) {
  return res.status(201).json(req.user);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});





// attiva il server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});