## react-postgres-backend

Simple backend for PostgreSQL database CRUD requests. Frontend for this app [here](https://github.com/Azargaz/CRUD-practice-frontend).

Created with Express.js + Knex and PostgreSQL DB.

### Running

First you need to create PostgreSQL Database and create table "test1" with these attributes: 
id, first, last, email, phone, location, hobby, added.
Then create .env file with these variables:

- DB_USER="your database username"
- DB_PASS="your db user's password"
- DB_NAME="your database name"
- DB_SCHEMA="schema in which you have"

Then install dependencies with `npm install`,
and finally run everything with command `npm start`.

Now you can either test the API with your browser or programs like [Postman](https://www.getpostman.com/) or get the [frontend here](https://github.com/Azargaz/CRUD-practice-frontend). 
Important: you need to run backend on port 3000 and the frontend 3001 or change server.js in backend to whitelist other port.
