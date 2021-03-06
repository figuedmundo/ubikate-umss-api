'use strict';

// Import node module
import express from 'express';
import places from '../model/query/places';
import placeImages from './placeImage';

const router = express.Router();

router.get('/', places.getAll);
router.get('/:id', places.getPlace);
router.get('/search/:name', places.getPlacesByName);
router.post('/new', places.newPlace);
router.put('/:id/edit', places.editPlace);
router.get('/visited/count', places.visitedCount);
router.put('/:id/visit', places.updatePlaceVisited);


// // you can nest routers by attaching them as middleware:
router.use('/:place_id/images/', placeImages);


// Exporting an object as the default import for this module
export default router;
