import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SecurityService } from './security.service';
import { AdminJwtStrategy } from './strategies';
import { getConfig } from '../config';
import { AdminEntity, CustomerEntity } from '../persistance';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, CustomerEntity]),
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
