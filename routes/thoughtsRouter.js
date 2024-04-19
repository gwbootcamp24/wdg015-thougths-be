import { Router } from 'express';
import {
  createThought,
  deleteThought,
  getAllThoughts,
  getSingleThought,
  updateThought
} from '../controllers/thoughts.js';
import verifyToken from '../middlewares/verifyToken.js';

const thoughtsRouter = Router();

thoughtsRouter.route('/').get(getAllThoughts).post(verifyToken, createThought);

thoughtsRouter
  .route('/:id')
  .get(getSingleThought)
  .put(verifyToken, updateThought)
  .delete(verifyToken, deleteThought);

export default thoughtsRouter;
