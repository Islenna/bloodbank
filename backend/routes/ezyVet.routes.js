const express = require('express');
const router = express.Router();
const { getAnimalDetailsByCode } = require('../controllers/ezyVet.controller');

router.get('/animal/:code', getAnimalDetailsByCode);

module.exports = router;
