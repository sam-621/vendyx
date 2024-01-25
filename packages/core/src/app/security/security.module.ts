import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SecurityService } from './security.service';
import { AdminJwtStrategy } from './strategies';
import { AdminEntity } from '../persistance';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'secret',
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [AdminJwtStrategy, SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
