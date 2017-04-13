'use strict';

import express from 'express';
import users from '../model/query/users';


const router = express.Router();

// Arrow functions
router.get('/', (req, res) => {
  res.send("respond ubikate");
});

router.get('/:id', users.getUser);
router.post('/new', users.newUser);

// Exporting an object as the default import for this module
export default router;

// var express = require('express');
// var router = express.Router();
//
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;
