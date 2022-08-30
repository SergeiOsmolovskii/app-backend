import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generatePasswordHash } from '../../../helpers/passwordHashGenerator';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  public async getAllUsers() {
    return (await this.usersRepository.find()).map(user => user.toResponse());
  }

  public async createUser(userDto: CreateUserDto) {
    const passwordAsHash = await generatePasswordHash(userDto.password);
    const newUserData = {...userDto, password: passwordAsHash};
    const createdUser = this.usersRepository.create(newUserData);
    return (await this.usersRepository.save(createdUser)).toResponse();
  }

  public async getUserById(id: string) {
    const currentUser = await this.usersRepository.findOneBy({id});
    if (!currentUser) throw new NotFoundException(`User with ${id} not found`);
    return currentUser.toResponse();
  }
}
