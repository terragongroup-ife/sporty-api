const puppeteer = require('puppeteer');
const fs = require ('fs');

class Scrapper{
        scrape (req, res) {
                return new Promise( (resolve, reject)=>{
                        
    let sportUrl = 'https://www.goal.com/en-gb/results/2019-03-03';
    (async () => {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 926 });
        await page.setRequestInterception(true);
        
        page.on('request', (req) =>{
            if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
                req.abort();
            }
            else {
                req.continue();
            }
        });
        await page.goto(sportUrl, {         
            waitUntil: 'networkidle2',
            timeout: 0
        });
        let sportData = await page.evaluate(() =>{
            // generating random questions
            function generateRandom(min, max, num) {
                var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
                return randomNum == num ? generateRandom(min, max, num) : randomNum;
            }
            let homeData = [];
            let awayData =[];
            //get the sport elements
            let homematchData = document.querySelectorAll('div.team-home');        
            homematchData.forEach((sportelement) => { 
                let sportJson = {};
                try { 
                    sportJson.hometeam = sportelement.querySelector('span.team-name').innerText;
                    sportJson.homescore = sportelement.querySelector('span.goals').innerText;
                    sportJson.wronghomescore_1 = generateRandom(0, 4, sportJson.homescore);
                    sportJson.wronghomescore_2 = generateRandom(0, 4, sportJson.homescore);
                    sportJson.wronghomescore_3 = generateRandom(0, 4, sportJson.homescore);
                                       
                }
                catch (exception){
                    console.log('error saving home team details')
                }
                homeData.push(sportJson);
            });
            let awaymatchData = document.querySelectorAll('div.team-away');
            awaymatchData.forEach((awayelement) => { 
                let sportJson = {};
                try {
                    sportJson.awayteam = awayelement.querySelector('span.team-name').innerText;
                    sportJson.awayscore = awayelement.querySelector('span.goals').innerText;
                    sportJson.awaywrongscore_1 = generateRandom(0, 4, sportJson.awayscore);
                    sportJson.awaywrongscore_2 = generateRandom(0, 4, sportJson.awayscore);
                    sportJson.awaywrongscore_3 = generateRandom(0, 4, sportJson.awayscore);
                }
                catch (exception){
                    console.log('error saving away team details')
                }
                awayData.push(sportJson);
            });
            return homeData.concat(awayData);  
                
        });
        // console.log(JSON.stringify(sportData, null, 2));
        let formQue = JSON.stringify(sportData, null, 2);
        let homeTeamArr = []; 
        let homeScoreArr =[];
        let wrongHomeScoreArr_1 =[];
        let wrongHomeScoreArr_2 =[];
        let wrongHomeScoreArr_3 =[]; 
        let question = [];     
        for (var j=0; j<sportData.length/2; j++){
            const homeTeam = sportData[j].hometeam;
            const homeScore = sportData[j].homescore;
            const wrongHomeScore_1 = sportData[j].wronghomescore_1;
            const wrongHomeScore_2 = sportData[j].wronghomescore_2;
            const wrongHomeScore_3 = sportData[j].wronghomescore_3;
            homeTeamArr.push(homeTeam);
            homeScoreArr.push(homeScore);
            wrongHomeScoreArr_1.push(wrongHomeScore_1);
            wrongHomeScoreArr_2.push(wrongHomeScore_2);
            wrongHomeScoreArr_3.push(wrongHomeScore_3);
            
        }
        let awayTeamArr = [];
        let awayScoreArr =[];
        let wrongAwayScoreArr_1 =[];
        let wrongAwayScoreArr_2 =[];
        let wrongAwayScoreArr_3 =[];
        for (var i=sportData.length/2; i<sportData.length; i++){         
            const awayTeam = sportData[i].awayteam;
            const awayScore = sportData[i].awayscore;
            const wrongAwayScore_1 = sportData[i].awaywrongscore_1;
            const wrongAwayScore_2 = sportData[i].awaywrongscore_2;
            const wrongAwayScore_3 = sportData[i].awaywrongscore_3;
            awayScoreArr.push(awayScore);
            awayTeamArr.push(awayTeam);
            wrongAwayScoreArr_1.push(wrongAwayScore_1);
            wrongAwayScoreArr_2.push(wrongAwayScore_2);
            wrongAwayScoreArr_3.push(wrongAwayScore_3);
        }

        for ( i=0; i<homeTeamArr.length; i++){
            let sportQueJson = {};
            sportQueJson.question = 'what is the score between ' + homeTeamArr[i] + ' vs ' +awayTeamArr[i] ;
            sportQueJson.answer = homeScoreArr[i]+ ':' +awayScoreArr[i];
            sportQueJson.wronganswer_1 = wrongHomeScoreArr_1[i]+ ':' + wrongAwayScoreArr_1[i];
            sportQueJson.wronganswer_2 = wrongHomeScoreArr_2[i]+ ':' + wrongAwayScoreArr_2[i];
            sportQueJson.wronganswer_3 = wrongHomeScoreArr_3[i]+ ':' + wrongAwayScoreArr_3[i]
            question.push(sportQueJson);    
        }
        fs.writeFile('question.json', JSON.stringify(question, null, 2), (err, question)=>{
                if (err) {
                        reject("unable to write file")
                        console.log(err);
                        return res.send({
                                error: true,
                                code: 408,
                                message: err
                        })
                }
                else{
                        resolve("File written succesfully");
                        console.log('File written succesfully')
                }
                
        })
    })();
})
}
}

 module.exports = Scrapper;