import { Router } from 'express';
import { UserService } from '../services/user.service';

const userController = Router();
const userService = new UserService();

userController.post('/user', async (req, res) => {
  const { login, password } = req.body;

  const { user, token } = await userService.register(login, password);
  res.status(201).json({ user, token });
});

export default userController;
