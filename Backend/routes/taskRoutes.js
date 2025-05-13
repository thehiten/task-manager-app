import express from 'express';
import { fetchTasks, createTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', fetchTasks);
router.post('/', createTask);

export default router;
