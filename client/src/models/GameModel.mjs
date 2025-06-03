// singola partita

function Game(id, userId, startedAt, status) {
   
    this.id = id; // id della partita
    this.userId = userId; // id dell'utente che ha creato la partita
    this.startedAt = startedAt; // data di inizio della partita
    this.status = status; // stato della partita (in corso, conclusa, annullata)
    
}

export {Game};