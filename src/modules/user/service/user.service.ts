import * as bcrypt from 'bcrypt';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generatePasswordHash } from '../../../helpers/passwordHashGenerator';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async getAllUsers() {
    return (await this.usersRepository.find()).map(user => user.toResponse());
  }

  public async createUser(userDto: CreateUserDto) {
    const isCurrentLoginInDB = await this.usersRepository.findOneBy({login: userDto.login});
    const isCurrentEmailInDB = await this.usersRepository.findOneBy({email: userDto.email});
    
    if (isCurrentLoginInDB) throw new ForbiddenException(`User with the same login already exists`);
    if (isCurrentEmailInDB) throw new ForbiddenException(`User with the same email already exists`);

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

  public async updateUser(id: string, passwordsDto: UpdatePasswordDto) {
    const currentUser = await this.usersRepository.findOneBy({id});
    
    if (!currentUser) throw new NotFoundException(`User with ${id} not found`);
    
    const newPasswordAsHash = await generatePasswordHash(passwordsDto.newPassword);
    const isValid = await bcrypt.compare(passwordsDto.oldPassword, currentUser.password);
    
    if (!isValid) throw new ForbiddenException('Old password is incorrect');
    
    const updatedUserData = {...passwordsDto, password: newPasswordAsHash};
    const updatedUser = this.usersRepository.merge(currentUser, updatedUserData);
    return (await this.usersRepository.save(updatedUser)).toResponse();
  }

  public async deleteUser(id: string): Promise<void> {
    const currentUser = await this.usersRepository.findOneBy({id});
    if (!currentUser) throw new NotFoundException(`User with ${id} not found`);
    await this.usersRepository.delete(id);
  }
}
