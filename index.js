require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const CronJob = require('cron').CronJob;
const task = require('./controllers/schedules');


const job = {};

const PORT = process.env.PORT;
const prefix = '/api/v1/';

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(`${prefix}task`, task);
app.get('/' , (req,res)=>{
    res.send('hello')
})//

app.listen(PORT, () => {
    console.log('Application is up and running and listening to port \%s', PORT);
})

