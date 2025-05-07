import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userRepository.create({
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === 23505) {
        throw new ConflictException('Credentials taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async getByEmail(userEmail: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: userEmail });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(userId: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    await this.userRepository.merge(user, data)
    return await this.userRepository.save(user);
  }

  async remove(userId: string) {
    return await this.userRepository.delete({ id: userId })
  }


}
