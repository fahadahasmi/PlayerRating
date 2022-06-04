require('dotenv').config();
const express = require('express');
const cors = require("cors");
const players = require('./src/routes/players.js');
var bodyParser = require('body-parser');
const app = express();
const PORT = 4000 || process.env.PORT;
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/players', players);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});