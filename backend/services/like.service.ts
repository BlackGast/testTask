import { getRepository } from 'typeorm';
import { Like } from '../entity/Like';
import { User } from '../entity/User';

export class LikeService {
  private likeRepository = getRepository(Like);

  async getLikesForUser(userId: string) {
    return this.likeRepository.find({ where: { user: { id: userId } } });
  }

  async addLike(userId: string, catId: string) {
    const like = this.likeRepository.create({
      cat_id: catId,
      user: { id: userId } as User, 
    });
    await this.likeRepository.save(like);
    return like;
  }

  async removeLike(userId: string, catId: string) {
    const like = await this.likeRepository.findOne({ where: { cat_id: catId, user: { id: userId } } });
    if (!like) {
      throw new Error('Like not found');
    }

    await this.likeRepository.remove(like);
    return like;
  }
}
