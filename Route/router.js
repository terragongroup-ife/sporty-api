const express = require('express');
const bodyParser = require('body-parser');
const Scrapper = require('../controller/webScrapper');
const router = express.Router();
const fs = require('fs');
const Question = require('../Model/question');
const shuffle = require('../Config/functions');
const CronJob = require('cron').CronJob;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Endpoint for scrapping, saving and deleting questions

router.get('/scrape', (req, res)=>{
    new Scrapper().scrape(req, res)
    .then((resp) => {
        return res.status(200).send({
            error: false,
            code: 200,    
        })
    })
    .catch( (error)=>{
        console.log('error: ', error);
    })
});
// Endpoint for fetching random questions
router.get('/random', (req, res) => {
    Question.aggregate(
        [ { $sample: { size: 10 } } ]
    )
    .then((data) => {
        data.forEach(question => {
            question.options = shuffle(question.options);
        });
        return res.send({
            error: false,
            code: 200,
            message: 'Questions gotten successfully',
            data
        });
    })
    .catch((err) => {
        return res.send({
            error: true,
            code: 404,
            message: 'Unable to get questions',
            data
        });
    })
});
module.exports = router;

