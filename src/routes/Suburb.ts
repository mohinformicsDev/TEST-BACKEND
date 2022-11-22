import express from 'express';
import controller from '../controllers/Suburb';

const router = express.Router();

router.post('/fetchByPostcodeRange', controller.getData);
router.post('/create', controller.createData);

export = router;
