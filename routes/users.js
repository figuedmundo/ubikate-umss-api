'use strict';

import express from 'express';
const router = express.Router();

// Arrow functions
router.get('/', (req, res) => {
  res.send("respond ubikate");
});
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
