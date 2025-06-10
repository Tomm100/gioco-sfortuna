import db from './db.mjs';


export const createGame = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO games (userId, status) VALUES (?, ?)';
    db.run(sql, [userId, "ongoing"], function(err) {
      if (err) {
        console.error('Errore durante la creazione della partita:', err);
        reject(err);
      } else {
        resolve(this.lastID); // Restituisce l'ID della nuova partita
      }
    });
  });

}


export const getGameById = (gameId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM games WHERE id = ?';
    db.get(sql, [gameId], (err, row) => {
      if (err) {
        console.error('Errore durante il recupero della partita:', err);
        reject(err);
      } else {
        resolve(row); // Restituisce la partita trovata
      }
    });
  });
};

export function updateGameStatus(gameId, status) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE games SET status = ? WHERE id = ?';
    db.run(sql, [status, gameId], function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}


export function createDemoGame() {
  // devo creare una partita demo
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO games (status) VALUES (?)';
    db.run(sql, ["ongoing"] , function(err) {
      if (err) {
        console.error('Errore durante la creazione della partita:', err);
        reject(err);
      } else {
        resolve(this.lastID); // Restituisce l'ID della nuova partita
      }
  })
}
);

}











