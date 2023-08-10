# Welcome to Booking Service

## Project Setup
- clone the project on your local
- Execute `npm install` on the same path as of your root directory of the downloaded project
- Create a `.env` file in the root directory and add the following environment variable
    - `PORT=3002`
    - `FLIGHT_SERVICE_PATH='http://localhost:3000'`
    - `EXCHANGE_NAME=AIRLINE_BOOKING`
    - `REMINDER_BINDING_KEY=REMINDER_SERVICE`
    - `MESSAGE_BROKER_URL='amqp://localhost'`
- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "BOOKING_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
- Once you've added your db config as listed above, go to the src folder from your terminal and execute `npx sequelize db:create`
and then execute

`npx sequelize db:migrate`
```


```
`npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum,noOFSeats:integer,totalCost:integer`

```