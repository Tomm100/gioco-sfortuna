import sqlite from 'sqlite3';


const db = new sqlite.Database('./gioco-sfortuna.sqlite', (err) => {
  if (err) throw err;
});

console.log('Database connected successfully');
export default db;