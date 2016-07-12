'use strict';

// Import node module
import express from 'express';
import ways from '../model/query/ways';

const router = express.Router();


router.get('/node/:lat/:lon', ways.getNode);
router.get('/route/:target/:source', ways.getWay);

// Exporting an object as the default import for this module
export default router;
