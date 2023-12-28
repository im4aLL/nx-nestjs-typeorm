import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '@nx-nestjs-typeorm/user';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { SignupDto } from './dtos';
import { AlreadyExistsError } from '@nx-nestjs-typeorm/errors';
import { AUTH_CONST } from './auth.constant';
import { User } from '@nx-nestjs-typeorm/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService
  ) {}

  /**
   * Create new user
   *
   * @param signupDto SignupDto
   * @returns Promise<User | void>
   */
  async signup(signupDto: SignupDto): Promise<User | null> {
    const isUserExists = !!(await this.userService.findOneByEmail(
      signupDto.email
    ));

    if (isUserExists) {
      throw new AlreadyExistsError(AUTH_CONST.messages.userAlreadyExists);
    }

    const hash = await argon2.hash(signupDto.password);
    const user = this.userRepository.create({ ...signupDto, password: hash });

    return await this.userRepository.save(user);
  }
}
