// Carta nel singolo round di un gioco
function GameCards(id, gameId, cardId, roundNumber, guessed){
    this.id = id; // id della carta nel round
    this.gameId = gameId; // id della partita a cui appartiene la carta
    this.cardId = cardId; // id della carta
    this.roundNumber = roundNumber; // numero del round a cui appartiene la carta
    this.guessed = guessed; // booleano che indica se la carta è stata indovinata
    
    
}

export {GameCards};