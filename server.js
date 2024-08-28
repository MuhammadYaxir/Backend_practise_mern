import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// const port = 3000;
dotenv.config();
const port = process.env.PORT;

// db.connect();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

connectDB();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});