const fs = require('fs');
const fetch = require('node-fetch');

const CANDIDATES = require('../candidates.js')

console.log('bot ready');

let totalCount = 0;
let currentCount = 0;

// const DB =[];

const fecLoop = async (pagination=null) => {

    let lastIndex = pagination ? '&last_index=' +  pagination.last_index : '';

    await setTimeout(()=> {

         fetch(`https://api.open.fec.gov/v1/schedules/schedule_a/?per_page=20&two_year_transaction_period=2020&sort_hide_null=false&sort=-contribution_receipt_date&api_key=8PTHEXV4lgB9cK64b5VJeImc14wwA8Ubc7ayTLfo&sort_null_only=true${lastIndex}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);

            // write the data to JSON
            fs.writeFileSync(
                './data/DB_' + currentCount +'.JSON', 
                '{"results": ' + JSON.stringify(data) + '}', 
                err=>{console.log(err)});

            let lastIndexes = data.pagination.last_indexes;
            let dataCount = data.pagination.count;
            let perPage = data.pagination.per_page;

            currentCount = currentCount + perPage;
            totalCount = dataCount;



            if(currentCount < totalCount) {
                return fecLoop(lastIndexes);
            } else {
                return console.log('All records returned');
            }
        })
        .catch(err=>{console.log(err)});

    }, 1000)
    
} 

console.log('Start');

fecLoop();




console.log('End');



// fs.writeFileSync('./data/fecData.JSON', ']}', {flag: 'a+'});

