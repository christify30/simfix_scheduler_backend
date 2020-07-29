const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({path: __dirname + '/.env'});

const users = require('./controllers/users');
const documents = require('./controllers/documents')

const PORT = process.env.PORT || 9000;
const prefix = '/api/v1/';
app.get('/test', (req,res)=>{res.send('working')});

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(`${prefix}users`, users)
app.use(`${prefix}documents`, documents)

app.listen(PORT, () => {
    console.log('Application is up and running and listening to port \%s', PORT);
})