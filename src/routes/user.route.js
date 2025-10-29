import { Router } from 'express';
import { create, findAll, findById, update } from '../controllers/user.controller.js';
import { validId, validUser } from '../middlewares/global.middleware.js';

const router = Router()

router.post('/create', create);
router.get('/find', findAll);
router.get('/find/:id', validId, validUser, findById);
router.patch('/update/:id', validId, validUser, update);

export default router;
