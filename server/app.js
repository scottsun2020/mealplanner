/*
    step to run
    1. install dependencies: npm install
    2. start the server with nodemon: npm run dev

*/

import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import meals from './api/routes/meals.js';
import users from './api/routes/users.js';
import mealplans from './api/routes/mealplans.js';

import mongodb from './db/connection.js';

const app = express();
const PORT = 8080;

//console.log(process.env.SPOONACULAR_API_URL);

const options = { exposedHeader: ['Authorization'] };
app.use(cors(options));

app.use(express.json());

app.use('/meals', meals);
app.use('/users', users);
app.use('/mealplans', mealplans);


app.listen(PORT, async () =>{
    //connecting to  mongo db before starting the serer
    await mongodb.connect();

    console.log(`Server is running on port: ${PORT}`);
});
