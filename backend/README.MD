# Fridge helper - backend

directly connect to db:
`flyctl postgres connect -a <app_name-db>`

clear postgres:
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

or revert all migrations/seeds:
await seeder.down({ to: 0 })
await migrator.down({ to: 0 })
