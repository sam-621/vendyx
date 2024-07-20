import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SecurityService } from './security.service';
import { AdminJwtStrategy } from './strategies';
import { getConfig } from '../config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => {
        const { jwtExpiresIn, jwtSecret } = getConfig().auth;
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: jwtExpiresIn }
        };
      }
    })
  ],
  providers: [AdminJwtStrategy, SecurityService],
  exports: [SecurityService]
})
export class SecurityModule {}
