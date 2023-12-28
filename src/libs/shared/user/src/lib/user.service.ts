import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@nx-nestjs-typeorm/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from '@nx-nestjs-typeorm/errors';
import { USER_CONST } from './user.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch {
      throw new NotFoundError(USER_CONST.messages.notFound);
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch {
      throw new NotFoundError(USER_CONST.messages.notFound);
    }
  }

  async find(email: string): Promise<User[]> {
    return await this.userRepository.find({ where: { email } });
  }

  async update(id: string, attrs: Partial<User>): Promise<User | null> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundError(USER_CONST.messages.notFound);
    }

    Object.assign(user, attrs);

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundError(USER_CONST.messages.notFound);
    }

    return this.userRepository.remove(user!);
  }
}
