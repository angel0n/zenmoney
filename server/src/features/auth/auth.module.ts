import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' }
    })
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}