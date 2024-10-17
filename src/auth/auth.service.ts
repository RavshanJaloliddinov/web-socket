import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/models';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User){}
  login(payload: AuthLoginDto) {
    const {email,password} = payload
    const foundedUser = this.userModel.findOne()
    return 'This action adds a new auth';
  }

  register(payload: AuthRegisterDto) {
    return `This action returns all auth`;
  }


}
