import express from 'express';
import likeController from './controllers/like.controller';
import userController from './controllers/user.controller';

const app = express();
app.use(express.json());

app.use('/api', likeController);
app.use('/api', userController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
