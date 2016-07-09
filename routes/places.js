'use strict';

// Import node module
import express from 'express';
import placesQuery from '../model/query'

const router = express.Router();

router.get('/', placesQuery.getAll);

// Exporting an object as the default import for this module
export default router;
