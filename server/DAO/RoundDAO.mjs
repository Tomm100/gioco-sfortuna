import db from './db.mjs';


// aggiunge le carte iniziali nella tabella gameCards
export const addInitialCards = (gameId, initialCards ) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO initialCards (gameId, cardId) VALUES (?, ?)';
        const promises = initialCards.map(cardId => {
            return new Promise((res, rej) => {
                db.run(sql, [gameId, cardId], (err) => {
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


// recupera le carte usate gli id in una partita specifica (iniziali, vinte e perse)
export const getUsedCardIdsForGame = (gameId) =>{
 return new Promise((resolve, reject) => {
    if (!gameId) {
      reject(new Error('gameId è richiesto'));
      return;
    }

    const sql = `
      SELECT cardId FROM initialCards WHERE gameId = ?
      UNION
      SELECT cardId FROM gameCards WHERE gameId = ?
    `;
    
    db.all(sql, [gameId, gameId], (err, rows) => {
      if (err) {
        console.error('Errore durante il recupero di tutte le carte usate:', err);
        reject(err);
      } else {
        const cardIds = rows.map(row => row.cardId);
        resolve(cardIds);
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
        resolve((row.maxRound || 0)+1); // Restituisce il numero massimo di round o 0 se non ci sono round
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
            SELECT DISTINCT c.id, c.name, c.img, c.badluck
            FROM cards c 
            WHERE c.id IN (
                -- Carte iniziali (sempre in mano al giocatore)
                SELECT cardId FROM initialCards WHERE gameId = ?
                
                UNION
                
                -- Carte dei round che sono state indovinate (guessed = 1)
                SELECT cardId FROM gameCards 
                WHERE gameId = ? AND guessed = 1
            )
            ORDER BY c.badluck ASC`;
            
        db.all(sql, [gameId, gameId], (err, rows) => {
            if (err) {
                return reject(err);
            }
                
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
            SELECT 
                (SELECT COUNT(*) FROM initialCards WHERE gameId = ?) +
                (SELECT COUNT(*) FROM gameCards WHERE gameId = ? AND guessed = 1) AS cnt`;
        
        db.get(sql, [gameId, gameId], (err, row) => {
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