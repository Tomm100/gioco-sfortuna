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


export const getUserGamesHistory = async (userId) => {
  try {
    // Query per recuperare tutte le partite completate dell'utente, ordinate per data
    const gamesQuery = `
      SELECT 
        g.id as gameId,
        g.status,
        g.startedAt
        
      FROM games g
      WHERE g.userId = ? 
        AND g.status IN ('won', 'lost')
      ORDER BY g.startedAt DESC
    `;
    
    const games = await new Promise((resolve, reject) => {
      db.all(gamesQuery, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Per ogni partita, recupero i dettagli delle carte (SOLO NOMI)
    const gamesWithDetails = await Promise.all(
      games.map(async (game) => {
        const gameDetails = await getGameCardsDetailsForHistory(game.gameId);
        
        return {
          gameId: game.gameId,
          status: game.status,
          startedAt: game.startedAt,
          totalCardsCollected: gameDetails.totalCardsCollected,
          cards: gameDetails.cards
        };
      })
    );

    return gamesWithDetails;
  } catch (error) {
    console.error('Errore in getUserGamesHistory:', error);
    throw error;
  }
};


const getGameCardsDetailsForHistory = async (gameId) => {
  try {
    // Query per recuperare le carte iniziali - SOLO NOME per cronologia
    const initialCardsQuery = `
      SELECT 
        c.id,
        c.name
      FROM initialCards ic
      JOIN cards c ON ic.cardId = c.id
      WHERE ic.gameId = ?
      ORDER BY c.badluck ASC
    `;
    
    // Query per recuperare le carte del gioco - SOLO NOME per cronologia
    const gameCardsQuery = `
      SELECT 
        c.id,
        c.name,
        gc.roundNumber,
        gc.guessed
      FROM gameCards gc
      JOIN cards c ON gc.cardId = c.id
      WHERE gc.gameId = ?
      ORDER BY gc.roundNumber ASC, c.badluck ASC
    `;
    
    const initialCards = await new Promise((resolve, reject) => {
      db.all(initialCardsQuery, [gameId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    const gameCards = await new Promise((resolve, reject) => {
      db.all(gameCardsQuery, [gameId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    // Conto le carte conquistate: tutte le iniziali + quelle del gioco con guessed = 1
    const totalCardsCollected = initialCards.length + gameCards.filter(card => card.guessed === 1).length;
    
    // Organizzo le carte per la cronologia - SOLO NOMI come richiesto dalle specifiche
    const organizedCards = [
      // Carte iniziali (sempre conquistate, nessun round associato)
      ...initialCards.map(card => ({
        id: card.id,
        name: card.name,
        // NON includo image e badluck per rispettare le specifiche
        roundNumber: null, // Le carte iniziali non hanno round
        isWon: true, // Le carte iniziali sono sempre conquistate
        isInitial: true
      })),
      // Carte del gioco
      ...gameCards.map(card => ({
        id: card.id,
        name: card.name,
        // NON includo image e badluck per rispettare le specifiche
        roundNumber: card.roundNumber,
        isWon: card.guessed === 1,
        isInitial: false
      }))
    ];

    return {
      totalCardsCollected,
      cards: organizedCards
    };
  } catch (error) {
    console.error('Errore in getGameCardsDetailsForHistory:', error);
    throw error;
  }
};