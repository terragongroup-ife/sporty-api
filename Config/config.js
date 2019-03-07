require('dotenv').config();

const Appname = 'Questions trivia'


const config = {
    Appname,
    port: process.env.PORT
};

module.exports = config;