import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/user.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// const port = 3000;
dotenv.config();
const port = process.env.PORT;
app.use(cors());

// db.connect();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', router);
connectDB();

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});