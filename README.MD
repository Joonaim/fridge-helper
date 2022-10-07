# Fridge helper

## Fly.io

start:
<https://fly.io/docs/hands-on/install-flyctl/>

Backend ``.env`` DATABASE_URL = fly.io connect-string:
`postgres://postgres:<password>@localhost:5432/postgres`

tunnel (needs to be running when communicating between local app and postgres):
`flyctl proxy 5432 -a <app-name>-db`
see more: <https://fly.io/docs/reference/postgres/#connecting-to-postgres-from-outside-fly>

directly connect to db:
`flyctl postgres connect -a <app_name-db>`

clear postgres:
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

revert all migrations/seeds:
await seeder.down({ to: 0 })
await migrator.down({ to: 0 })

## Get started

-   Create file ``.env`` in the folder ``backend`` following the format:

        PORT=<port for backend here>
        FRONTEND_URL=<frontend url here>
        DATABASE_URL=<database url here>
        SESSION_SECRET=<session secret here>


    ***NOTE*** PORT may be any desired port for the backend (if not set default is 3001). FRONTEND_URL is usually ``http://localhost:3000`` during development (depending on react port). DATABASE_URL is of format ``postgres://db_user:db_pass@db_host_address:db_port/db_name``, refer to upper section ``Fly.io``. SESSION_SECRET may be anything for development purposes.

-   Create file ``.env`` in the folder ``frontend`` with the format:

        REACT_APP_BACKEND_URL=<backend url here>

    ***NOTE*** REACT_APP_BACKEND_URL is ``http://localhost:3003`` or ``http://localhost:PORT`` where ``PORT`` is the port defined in backend ``.env``
    
- Install backend node dependencies by running ``npm install`` in the folder ``backend``
- Start backend development environment running ``npm run dev`` in the folder ``backend``
- Install frontend node dependencies by running ``npm install`` in the folder ``frontend``
- Start frontend development environment running ``npm start`` in the folder ``frontend``
- **DONE**