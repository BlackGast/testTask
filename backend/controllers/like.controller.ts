import { Router } from 'express';
import { LikeService } from '../services/like.service';
import { authenticateJWT } from '../middleware/auth';

const likeController = Router();
const likeService = new LikeService();

likeController.get('/likes', authenticateJWT, async (req, res) => {
  const userId = req.user.userId;
  const likes = await likeService.getLikesForUser(userId);
  res.json({ data: likes });
});

likeController.post('/likes', authenticateJWT, async (req, res) => {
  const { cat_id } = req.body;
  const userId = req.user.userId;

  const like = await likeService.addLike(userId, cat_id);
  res.status(201).json(like);
});

likeController.delete('/likes/:cat_id', authenticateJWT, async (req, res) => {
  const { cat_id } = req.params;
  const userId = req.user.userId;

  await likeService.removeLike(userId, cat_id);
  res.status(200).json({ message: 'Like removed' });
});

export default likeController;