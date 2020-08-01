const express = require('express');
//const Models = require('../models');
const response = require('../scripts/response');
const validation = require('../validator');
const Task = require('../services/task');
const upload = require('../scripts/upload');
const Router = express.Router();
const multer = require('multer');

const singleUpload = upload("media","document").single('document');

Router.post('/start',  (req,res)=>{
    singleUpload(req, res, async (err)=>{
        const {errors, isValid} = validation.schedules(req.body);
        if(!isValid) return response.error({ res, error: Object.values(errors).join(',')});
        if (err instanceof multer.MulterError) {
            return response.error({ res,  error: 'The key for the file must be named document' });
         } else if (err) {
            return response.error({ res,  error: 'Failed to upload file please try again' });
         }
         if(!req.file) return  response.error({ res: res,  error: 'You must upload a file' });
         const task = new Task(req, res);
         task.startTask();
    })
});

Router.get('/', (req, res) => {
    const task = new Task(req, res);
    task.getTasks();
})

Router.post('/stop', (req,res)=>{
    if(!req.body.id) return response.error({ res,  error: 'The task id is required' });
    const task = new Task(req, res);
    task.stopTask();
});

module.exports = Router;