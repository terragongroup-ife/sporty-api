
require('dotenv').config();
const express = require('express');
const mongoose = require("./Config/settings");
const router = require("./Route/router");
const app = express();
const cors = require('cors');


const port = process.env.PORT;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
   });


app.use(router);

// Endpoint 1

app.get('/', (req, res) => {
    res.send('Welcome to Terra Sport-Quiz')
});

app.listen(port, () => {
    console.log(`Server is active on port ${port}`)
})


