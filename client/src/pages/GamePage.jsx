import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Card, Container, Spinner, Alert,Button  } from 'react-bootstrap';

import RoundPrompt from '../components/RoundPrompt.jsx';
import ModalResultRound from '../components/ModalResultRound.jsx';

import API from '../API/API.mjs';

import CardModel from '../models/CardModel.mjs'; 



function GamePage(){

    const { gameId } = useParams(); // prendo l'ID della partita dalla URL
    const navigate = useNavigate(); 

    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);           // carte conquistate ordinate per badluck
    const [nextCard, setNextCard] = useState(null);   // la carta da indovinare (nome+img)
    const [roundNum, setRoundNum] = useState(1);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState(null); // { result: 'correct'/'wrong', realIndex: number, card?: object }
    const [roundLoading, setRoundLoading] = useState(false);
    const [error, setError] = useState('');
   
   


    useEffect(() => {
        const loadInitial = async () => {
            try{
                const gameStats = await API.getGameStats(gameId);
                const playerCards = gameStats.playerCards.map((card) => 
                    new CardModel(card.id, card.name, card.image, card.badluck)
                ).sort((a, b) => a.badluck - b.badluck);
                
                
                
                
                setCards(playerCards); 
                setRoundNum(gameStats.roundNumber); 
                setWrongGuesses(gameStats.wrongGuesses);
                
                if (gameStats.status === 'lost' || gameStats.status === 'won') {
                    navigate(`/game/${gameId}/summary`);
                    return;
                }

                // Carico la prima "nextCard"
                const card = await API.getNextCard(gameId); // { id, name, image }
                setNextCard(card); 
            } catch (err) {
                console.error('Errore loading game:', err);
                setError('Errore durante il caricamento della partita. Riprova più tardi.');
            } finally {
                setLoading(false);
            }
        }
        
        loadInitial();
    }, [gameId, navigate]);

    if (loading) {
        return <div className="text-center mt-5"><Spinner animation="border" /> Caricamento partita…</div>;
    }

    const handleGuess = async (position) => {
        try {
            // 1) Se position === null, significa timeout del timer: round perso
            if (position === null) {
                console.log('Calling timeout API...');
                const response = await API.guessCardTimeout(gameId, nextCard.id);
                console.log('Timeout response:', response);
                setResultData(response);
                setShowResult(true);
            } else {
                // 2) Altrimenti, è un guess "normale"
                const response = await API.guessCard(gameId, nextCard.id, position);
                setResultData(response);
                setShowResult(true);
            }
        } catch (err) {
            setError('Errore durante il tentativo. Riprova più tardi.');
        }
    };

    const onCloseResult = async () => {
        setShowResult(false);
        

        if (resultData.result === 'correct') {
            // 1) Uso la realIndex che arriva dal backend
            const realIndex = resultData.realIndex;

            // 2) Costruisco la nuova lista di CardModel con nextCard inserita in realIndex
            const newCards = [...cards];
            newCards.splice(
                realIndex,
                0,
                new CardModel(
                    nextCard.id,
                    nextCard.name,
                    nextCard.image,
                    resultData.card.badluck
                )
            );
            setCards(newCards);

            // 3) Incremento roundNum
            setRoundNum((prev) => prev + 1);

            // 4) Se ho 6 o più carte, termino la partita
            if (newCards.length >= 6) {
                navigate(`/user/game/${gameId}/summary`);
                return;
            }

            // 5) Altrimenti chiedo la prossima carta
            try {
                setRoundLoading(true);
                const next = await API.getNextCard(gameId);
                setNextCard(next);
                setRoundLoading(false);
            } catch (err) {
                console.error('Errore nel recupero della prossima carta.', err);
                setError('Errore nel recupero della prossima carta.');
            }
        } else {
            // risultato "wrong"
            setWrongGuesses(resultData.wrongGuesses);
            setRoundNum((prev) => prev + 1);

            if (resultData.wrongGuesses >= 3) {
                navigate(`/user/game/${gameId}/summary`);
                return;
            }

            try {
                setRoundLoading(true);
                const next = await API.getNextCard(gameId);
                setRoundLoading(false);
                setNextCard(next);
            } catch (err) {
                console.error('Errore ottenendo la prossima carta:', err);
                 setError('Errore nel recupero della prossima carta.');
                
            }
        }
    };
    if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Caricamento partita...</p>
      </Container>
    );
  }


     if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-3">
          <Button variant="secondary" onClick={() => navigate('/user')}>
            Torna al profilo
          </Button>
        </div>
      </Container>
    );
  }

    return (
        <div>
            {roundLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
          <p>Preparazione prossimo round...</p>
        </div>
      ) : (
        nextCard && (
          <RoundPrompt
            cards={cards}
            nextCard={nextCard}
            onGuess={handleGuess}
            timeout={30}
            roundNum={roundNum}
            wrongGuesses={wrongGuesses}
            paused={showResult}
          />
        )
      )}
            
            {showResult && (
                <ModalResultRound
                    correct={resultData.result === 'correct'}
                    onClose={onCloseResult}
                />
            )}
        </div>
    );
}


export default GamePage;







