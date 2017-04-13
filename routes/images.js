'use strict';

// Import node module
import express from 'express';
import image from '../services/imageHelper';

const router = express.Router();

router.post('/', image.saveImage);
router.get('/', image.getAll);
router.get('/get/sample', image.getSample);
router.get('/:public_id', image.getImage);

// Exporting an object as the default import for this module
export default router;
