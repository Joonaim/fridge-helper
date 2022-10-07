# Fridge helper - backend

## Fly.io

start:
<https://fly.io/docs/hands-on/install-flyctl/>

ENV DATABASE_URL = fly.io connect-string:
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

