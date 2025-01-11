import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from '@/config/config.service';

import { AuthService } from './auth.service';
import { CustomerJwtStrategy } from './strategies/jwt/customer/customer-jwt.strategy';
import { UserJwtStrategy } from './strategies/jwt/user/user-jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT.SECRET'),
          signOptions: { expiresIn: configService.get('JWT.EXPIRES_IN') }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, UserJwtStrategy, CustomerJwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
