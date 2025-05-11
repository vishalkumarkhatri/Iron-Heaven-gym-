const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/index.js');
const connection = require('./lib/db');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))



app.use('/', router);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connection.connect();

});