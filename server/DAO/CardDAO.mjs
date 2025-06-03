import db from './db.mjs';
import Card from '../models/CardModel.mjs';


export const getAllCards = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM cards';
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        const cards = rows.map(c => new Card(c.id, c.name, c.img, c.badluck));
        resolve(cards);
      }
    });
  });
};

export const getInitialCards = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM cards ORDER BY RANDOM() LIMIT 3';
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else {
        const cards = rows.map(c => new Card(c.id, c.name, c.img, c.badluck));
        resolve(cards);
      }
    });
  });
}

export const getRandomCards = (n, excludeIds = []) => {
  return new Promise((resolve, reject) => {
    const placeholders = excludeIds.map(() => '?').join(',');
    const sql = `SELECT * FROM cards WHERE id NOT IN (${placeholders}) ORDER BY RANDOM() LIMIT ?`;
    db.all(sql, [...excludeIds, n], (err, rows) => {
      if (err) reject(err);
      else {
        const cards = rows.map(c => new Card(c.id, c.name, c.img, c.badluck));
        resolve(cards);
      }
    });
  });
}


export const getCardById = (cardId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM cards WHERE id = ?';
    db.get(sql, [cardId], (err, row) => {
      if (err) reject(err);
      else if (!row) resolve(null); // Nessuna carta trovata
      else {
        const card = new Card(row.id, row.name, row.img, row.badluck);
        resolve(card);
      }
    });
  });
}




