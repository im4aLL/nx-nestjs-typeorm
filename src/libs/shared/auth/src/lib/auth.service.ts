import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SignupDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@nx-nestjs-typeorm/user';
import { QueryFailedError, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { AUTH_CONST } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async signup(signupDto: SignupDto) {
    if (await this.isUserExists(signupDto.email)) {
      throw new ConflictException(AUTH_CONST.messages.userAlreadyExists);
    }

    const hash = await argon2.hash(signupDto.password);
    const user = this.userRepository.create({ ...signupDto, password: hash });

    return this.userRepository.save(user).catch((error) => {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
    });
  }

  private async isUserExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });

    return !!user;
  }
}
