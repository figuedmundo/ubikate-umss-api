'use strict';

// Import node module
import express from 'express';
import placeImages from '../model/query/placeImages';

const router = express.Router({mergeParams: true});

router.post('/', placeImages.newImage);
router.get('/', placeImages.getImages);

// Exporting an object as the default import for this module
export default router;
