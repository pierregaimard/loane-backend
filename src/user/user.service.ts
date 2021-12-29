import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findBy(options: object): Promise<User[]> {
    return this.userRepository.find(options);
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneBy(options: object): Promise<User> {
    return this.userRepository.findOne(options);
  }

  save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
