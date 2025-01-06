import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { CustomerJwtStrategy } from './strategies/jwt/customer/customer-jwt.strategy';
import { UserJwtStrategy } from './strategies/jwt/user/user-jwt.strategy';

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
