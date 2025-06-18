[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/uNTgnFHD)
# Exam #N: "Exam Title"
## Student: s123456 LASTNAME FIRSTNAME 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

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
