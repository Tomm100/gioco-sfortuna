[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/uNTgnFHD)
# Exam #N: "Exam Title"
## Student: s123456 LASTNAME FIRSTNAME 

## React Client Application Routes

- Route `/`: Homepage pubblica dell’applicazione. Mostra una breve introduzione per utenti anonimi e un link al login. Accessibile solo da utenti non autenticati.

- Route `/regole`: Pagina con le istruzioni dettagliate del gioco, accessibile da chiunque.

- Route `/login`: Pagina per effettuare l'autenticazione. Dopo il login, l’utente viene reindirizzato alla sua dashboard.

- Route `/user`: Dashboard dell’utente registrato. Consente di iniziare una nuova partita o accedere alla cronologia delle partite completate.

- Route `/user/game/:gameId`: Pagina di gioco principale per utenti registrati. Mostra le carte in possesso e la nuova carta da collocare. 
  Il parametro `:gameId` identifica la partita in corso.

- Route `/user/game/:gameId/summary`: pagina accessibile solo agli utenti autenticati. Mostra il riepilogo della partita appena completata, inclusi:
  - L’esito della partita (vinta o persa)
  - L’elenco completo delle carte raccolte (nome, immagine e indice di sfortuna)
  - Un pulsante per iniziare una nuova partita
  - Un pulsante per tornare alla dashboard utente

  Il parametro `:gameId` identifica la partita in corso.


- Route `/user/storico`: pagina accessibile solo agli utenti autenticati. Mostra la cronologia delle partite completate, ordinate per data decrescente. Per ogni partita sono riportati:
  - L’esito finale (vinta o persa)
  - Il numero totale di carte raccolte 
  - La lista delle carte coinvolte, con:
    - Nome della situazione orribile
    - Etichetta “Iniziale” se la carta era tra le 3 iniziali
    - Etichetta “Round N” per le carte presentate nei vari round
    - Stato “Vinta” se la carta è stata ottenuta, “Persa” se non è stata vinta

- Route `/demo/game/:gameId`:Ppagina accessibile senza login. Permette di giocare una partita demo composta da un solo round. Il giocatore riceve 3 carte iniziali e deve collocare correttamente una situazione aggiuntiva. Il parametro `:gameId` identifica la partita demo in corso.

- Route `/demo/game/:gameId/summary`: Riepilogo della partita demo. Mostra le carte iniziali e, se il round è stato vinto, anche la carta ottenuta. Disponibile solo dopo aver completato la demo. Il parametro `:gameId` identifica la partita demo in appena completata.

- Route `*`: Pagina per route non valide. Mostra un semplice messaggio di errore "Page not found".
  

## API Server

- POST `/api/something`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- **`users`** - Contiene le credenziali degli utenti registrati:
  - `id` – Chiave primaria
  - `name` – Nome completo dell'utente
  - `email` – Email/username per il login
  - `password` – Password in formato hashato
  - `salt` – Valore salt per hashing sicuro

- **`cards`** - Contieene tutte le carte disponibili nel gioco:
  - `id` – Chiave primaria
  - `name` – Descrizione della situazione sfortunata
  - `img` – Nome del file immagine associato
  - `badluck` – Valore numerico dell’indice di sfortuna (da 1.0 a 100.0)

- **`games`** – Contiene tutte le partite giocate dagli utenti:
  - `id` – Chiave primaria
  - `userId` – Riferimento all’utente
  - `startedAt` – Data e ora di inizio della partita
  - `status` – stato della partita (`ongoing`, `won`, `lost`)

- **`initialCards`** – Contiene le 3 carte iniziali di ogni partita:
  - `id` – Chiave primaria
  - `gameId` – Riferimento alla partita
  - `cardId` – Riferimento alla carta iniziale

- **`gameCards`** – Contiene per ogni partita le carte di ciascun round:
  - `id` – Chiave primaria
  - `gameId` – Riferimento alla partita
  - `cardId` – Carta mostrata nel round
  - `roundNumber` – Numero del round
  - `guessed` – Flag (0/1) per indicare se la carta è stata indovinata o meno
  - `startedAt` – Timestamp di inizio del round


## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
