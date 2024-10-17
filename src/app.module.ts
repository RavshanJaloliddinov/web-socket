import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ClientModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
