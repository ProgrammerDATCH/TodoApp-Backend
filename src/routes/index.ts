import express from 'express';
import userRoutes from "./usersRoutes";
import todoRoutes from './todoRoutes';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/todo', todoRoutes);

export default router;