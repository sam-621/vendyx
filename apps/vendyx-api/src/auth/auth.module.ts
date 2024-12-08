import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { CustomerJwtStrategy, UserJwtStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: 'jwtSecret',
          signOptions: { expiresIn: '7d' }
        };
      }
    })
  ],
  providers: [AuthService, UserJwtStrategy, CustomerJwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
