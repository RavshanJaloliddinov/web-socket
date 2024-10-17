import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() payload: AuthLoginDto) {
    return this.authService.login(payload);
  }
  register(@Body() payload: AuthRegisterDto){
    return this.authService.register(payload)
  }


}
