import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
    create,
    findAll,
    topNews,
    findById,
    searchByTitle,
    byUser,
    update,
    erase,
    likeNews,
    addComment,
    deleteComment,
} from '../controllers/news.controller.js';

const router = Router();

router.post('/create', authMiddleware, create)
router.get('/find', findAll)
router.get('/top', topNews);
router.get('/search', searchByTitle);
router.get('/byUser', authMiddleware, byUser);
router.get('/find/:id', findById);
router.patch('/update/:id', authMiddleware, update);
router.delete('/delete/:id', authMiddleware, erase);
router.patch('/like/:id', authMiddleware, likeNews);
router.patch('/comment/:id', authMiddleware, addComment);
router.patch('/comment/:idNews/:idComment', authMiddleware, deleteComment);

export default router;
