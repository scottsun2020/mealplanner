import express from 'express';

import { loginUser, registerUser, getUserById, updateUserById } from '../controllers/users.js';

import { verifyUser } from '../middleware/authorization.js';

const router = express.Router();

//POST /users/register
router.post('/register', registerUser);

// POST /users/login
router.post('/login', loginUser);

// GET /users/:id :mean dynamic value
router.get('/:id', verifyUser, getUserById);

//PUT /users/:id
router.put('/:id', verifyUser, updateUserById);

export default router;