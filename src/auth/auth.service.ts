import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';


@Injectable()
export class AuthService {
  login(payload: AuthLoginDto) {
    return 'This action adds a new auth';
  }

  register(payload: AuthRegisterDto) {
    return `This action returns all auth`;
  }


}
