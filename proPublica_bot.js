const fs = require('fs');
const fetch = require('node-fetch');

const CANDIDATES = require('../candidates.js')

console.log('bot ready');

fs.writeFileSync('./data/DB.JSON', '{"results": [');

const DB =[];

const forLoop = async _ => {

    console.log('Start');

    // loop through CANDIDATES for each FEC ID
    for(let i = 0; i < CANDIDATES.length; i++){
        const cand = CANDIDATES[i];

        await fetch(`https://api.propublica.org/campaign-finance/v1/2020/candidates/${cand["fecId"]}.json`, {
            headers: {
                'X-API-Key': 'EFqx0amsWN1rTPB2a2OJvxhWu8svBg4ILcIvDyrw'
            }
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                console.log(data)
                DB.push(data);
                
            })
            .catch(err=>{console.log(err)});  
    }
    fs.writeFileSync(
        './data/proPublica.JSON', 
        '{"results": ' + JSON.stringify(DB) + '}', 
        err=>{console.log(err)});
    console.log('End');
}

forLoop();



fs.writeFileSync('./data/DB.JSON', ']}', {flag: 'a+'});

