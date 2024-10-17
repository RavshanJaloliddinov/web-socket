import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { promises } from 'dns';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private readonly userModel: typeof User) { }


  async create(payload: CreateUserDto): Promise<void> {
    await this.userModel.create({
      full_name: payload.full_name,
      image: payload.image,
      email: payload.email,
      password: payload.password,
    })
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll()
  }

  async findOne(id: number): Promise<User> {
    return await this.userModel.findOne({ where: { id } })
  }

  async update(id: number, payload: UpdateUserDto): Promise<void> {
    await this.userModel.create({
      full_name: payload?.full_name,
      image: payload?.image,
      email: payload?.email,
      password: payload?.password,
    })
  }

  async remove(id: number): Promise<void> {
    await this.userModel.destroy({ where: { id } })
  }
}
