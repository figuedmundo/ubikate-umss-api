'use strict';

// Import node module
import express from 'express';
import placeImages from '../model/query/placeImages';

const router = express.Router();

router.post('/new', placeImages.newImage);
router.get('/:place_id', placeImages.getImages);

// Exporting an object as the default import for this module
export default router;
