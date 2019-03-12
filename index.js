
require('dotenv').config();
const express = require('express');
const mongoose = require("./Config/settings");
const router = require("./Route/router");
const app = express();
const cors = require('cors');
app.use(cors());

const port = process.env.PORT;


app.use(router);


app.get('/', (req, res) => {
    res.send('Welcome to Terra Sport-Quiz')
});

app.listen(port, () => {
    console.log(`Server is active on port ${port}`)
})


