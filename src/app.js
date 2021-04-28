const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./database/connection');

//Routers
const cryptoRouter = require('./routers/cryptocurrency');

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(cryptoRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log("Running")
});

app.get('/', (req, res) => {
    res.status(201).send({'OK': true})
})

module.exports = app;

