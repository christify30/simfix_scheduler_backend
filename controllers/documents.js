const express = require('express');
const Router = express.Router();
const Documents = require('../services/documents');
const upload = require('../scripts/upload');

const singleUpload =  upload("media","document").single('document');
/*
Route: POST /api/document/
Description: upload document 
*/
Router.post('/', (req, res) => {
    singleUpload(req, res, async (err)=>{
        const document = new Documents(req, res);
        return document.uploadDocument(err);
    })
});

/*
Route: GET /api/documents/
Description: get all documents 
*/
Router.get('/', (req, res) => {
    const documents = new Documents(req, res);
    documents.viewDocuments(req, res);
});

module.exports = Router;