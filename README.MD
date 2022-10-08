# Fridge helper

## Fly.io

Create app&db:<br>
<https://fly.io/docs/hands-on/install-flyctl/>

Backend `.env` DATABASE_URL = fly.io connect-string:<br>
`postgres://postgres:<password>@localhost:5432/postgres` (default form)

Tunnel (needs to be running for development when communicating between local app and postgres):<br>
`flyctl proxy 5432 -a <app-name>-db`(default form)<br>
see more: <https://fly.io/docs/reference/postgres/#connecting-to-postgres-from-outside-fly>

## Get started

- Create file `.env` in the folder `backend` following the format:

      PORT=<port for backend here>
      FRONTEND_URL=<frontend url here>
      DATABASE_URL=<database url here>
      SESSION_SECRET=<session secret here>

  **_NOTE_** PORT may be any desired port for the backend (if not set default is 3003). FRONTEND_URL is usually `http://localhost:3000` during development (depending on react port). DATABASE_URL is of format `postgres://db_user:db_pass@db_host_address:db_port/db_name`, refer to upper section `Fly.io`. SESSION_SECRET may be anything for development purposes.

- Create file `.env` in the folder `frontend` with the format:

      REACT_APP_BACKEND_URL=<backend url here>

  **_NOTE_** REACT_APP_BACKEND_URL is `http://localhost:3003` or `http://localhost:PORT` where `PORT` is the port defined in backend `.env`

- Install backend node dependencies by running `npm install` in the folder `backend`
- Start backend development environment running `npm run dev` in the folder `backend`
- Install frontend node dependencies by running `npm install` in the folder `frontend`
- Start frontend development environment running `npm start` in the folder `frontend`
- **DONE**
