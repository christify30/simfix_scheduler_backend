const express = require('express');
const Router = express.Router();
const User = require('../services/users');

/*
Route: POST /api/v1/users/
Description: create user 
*/
Router.post('/', (req, res) => {
    const user = new User(req, res);
    user.addUser();
});

/*
Route: GET /api/v1/users/
Description: get all users 
*/
Router.get('/', (req, res) => {
    const user = new User(req, res);
    user.viewUsers(req, res);
});

module.exports = Router;