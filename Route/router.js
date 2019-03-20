const express = require('express');
const bodyParser = require('body-parser');
const Scrapper = require('../controller/webScrapper');
const router = express.Router();
const fs = require('fs');
const Question = require('../Model/question');
const shuffle = require('../Config/functions');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

 
router.get('/scrape', (req, res)=>{
    new Scrapper().scrape(req, res)
    .then( ()=>{
        fs.readFile('question.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err)
            }
            data = JSON.parse(data);
            console.log(data.length + ' ' + 'records' + ' ' + 'were' + ' ' + 'saved' + ' ' + 'successfully');
            Question.collection.insertMany(data)
            .then((resp) => {
                console.log('questions saved successfully');
                console.log(data)
        fs.unlink('question.json', (err) => {
                    if (err) {
                        throw error
                    }
                    console.log('File deleted');
                })
                return res.status(200).send({
                    error: false,
                    code: 200,
                    message: resp.result
                })
            })
            .catch((err) => {
                console.log('Unable to save questions', err);
                return res.status(400).send({
                    error: true,
                    code: 400,
                    message: err
                })
            });    
        });

    }).catch( (error)=>{
        console.log('error: ', error);
    })
});





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

