import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from 'constants/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from 'src/users/roles/roles.guard';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule,
    MailModule,
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
