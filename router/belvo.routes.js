const express = require('express');
const { root, getAllDetails, getAllTrasacctions, getBalance, getIntitutions, deleteAccount } = require('../controller/belvo.controller');
const route = express.Router();

route.post('/register', root);

route.get('/alldetails', getAllDetails);

route.post('/alltrasacctions', getAllTrasacctions);

route.post('/getbalance', getBalance);

route.get('/institutions', getIntitutions);

route.post('/deleteaccount', deleteAccount);

module.exports = route;