import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entity/User';

export class UserService {
  private userRepository = getRepository(User);

  async register(login: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: { login } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ login, password: hashedPassword });
    await this.userRepository.save(newUser);

    const token = this.generateToken(newUser.id);
    return { user: newUser, token };
  }

  private generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });
  }

  async authenticate(login: string, password: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id);
    return { user, token };
  }
}
