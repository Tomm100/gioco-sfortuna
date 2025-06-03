import db from './db.mjs';


// aggiunge le carte iniziali nella tabella gameCards
export const addInitialCards = (gameId, initialCards ) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO gameCards (gameId, cardId, roundNumber) VALUES (?, ?, ?)';
        const promises = initialCards.map(cardId => {
            return new Promise((res, rej) => {
                db.run(sql, [gameId, cardId, 0], (err) => {
                    if (err) {
                        console.error('Errore durante l\'aggiunta delle carte iniziali:', err);
                        rej(err);
                    } else {
                        res();
                    }
                });
            });
        });
        Promise.all(promises)
            .then(() => resolve())
            .catch(err => reject(err));
    });
};


// recupera le carte usate in una partita specifica (iniziali, vinte e perse)
export const getUsedCardIdsForGame = (gameId) =>{
  return new Promise((resolve, reject) => {
    const sql = 'SELECT cardId FROM gameCards WHERE gameId = ?';
    db.all(sql, [gameId], (err, rows) => {
      if (err) {
        console.error('Errore durante il recupero delle carte usate:', err);
        reject(err);
      } else {
        
        const cardIds = rows.map(row => row.cardId);
        
        resolve(cardIds); // Restituisce gli ID delle carte usate
      }
    });
  });

}


export const getRoundNumberForGame = (gameId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT MAX(roundNumber) AS maxRound FROM gameCards WHERE gameId = ?';
    db.get(sql, [gameId], (err, row) => {
      if (err) {
        console.error('Errore durante il recupero del numero di round:', err);
        reject(err);
      } else {
        resolve(row.maxRound || 1); // Restituisce il numero massimo di round o 0 se non ci sono round
      }
    });
  });
}


export const addGameCard = (gameId, cardId, roundNumber) => {

  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO gameCards (gameId, cardId, roundNumber) VALUES (?, ?, ?)';
    db.run(sql, [gameId, cardId, roundNumber], function(err) {  
      if (err) {
        console.error('Errore durante l\'aggiunta della carta alla partita:', err);
        reject(err);
      } else {
        resolve(this.lastID); // Restituisce l'ID della nuova riga inserita
      }
    });
  });
}

export function getPlayerCardsForGame(gameId) {
    // Recupera le carte che il giocatore ha in mano per una partita specifica (iniziali e quelle indovinate)
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT c.id, c.name, c.img, c.badluck
      FROM cards c 
      JOIN gameCards gc ON c.id = gc.cardId 
      WHERE gc.gameId = ? AND (gc.guessed IS NULL OR gc.guessed = 1)
      ORDER BY c.badluck ASC`;
    db.all(sql, [gameId], (err, rows) => {
      if (err) 
        return reject(err);
      const cards = rows.map(c => ({
        id: c.id,
        name: c.name,
        image: c.img,
        badluck: c.badluck
      }));
      resolve(cards);
    });
  });
}



export function updateGameCardGuessed(gameId, cardId, guessed) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE gameCards SET guessed = ? WHERE gameId = ? AND cardId = ?';
    db.run(sql, [guessed, gameId, cardId], function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}


export function countPlayerCards(gameId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) AS cnt
      FROM gameCards
      WHERE gameId = ? AND (guessed = 1 OR guessed IS NULL)`; ;
    db.get(sql, [gameId], (err, row) => {
      if (err) return reject(err);
      resolve(row.cnt);
    });
  });
}

export function countWrongGuesses(gameId) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) AS cnt
      FROM gameCards
      WHERE gameId = ? AND guessed = 0`;
    db.get(sql, [gameId], (err, row) => {
      if (err) return reject(err);
      resolve(row.cnt);
    });
  });
}