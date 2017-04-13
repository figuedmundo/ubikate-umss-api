'use strict';

// Import node module
import express from 'express';
import places from '../model/query/places';

const router = express.Router();

router.get('/', places.getAll);
router.get('/:id', places.getPlace);
router.get('/search/:name', places.getPlacesByName);
router.post('/new', places.newPlace);
router.put('/:id/edit', places.editPlace);

// Exporting an object as the default import for this module
export default router;
