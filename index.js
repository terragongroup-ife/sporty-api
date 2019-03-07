
require('dotenv').config();
const express = require('express');
const settings = require("./Config/settings");
const config = require("./Config/config");
const router = require("./Route/router");
const app = express();
const cors = require('cors');
app.use(cors());

const { port } = config;

app.get('/', (req, res) => {
    res.send('Welcome to Terra Sport-Quiz')
});

app.use(router);

app.listen(port, () => {
    console.log(`Server is active on port ${port}`)
})


