import express from 'express';

import getMeal from '../controllers/meals.js';

import { verifyUser } from '../middleware/authorization.js';

const router = express.Router();

// GET /meals/search?title=
router.get('/search', verifyUser, getMeal);

export default router;