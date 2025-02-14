import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create.user.dto';
import { MailService } from 'src/mail/mail.service';
import { DatabaseService } from 'src/database/database.service';
import { setOtp } from 'helpers/set-otp';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email: email },
      include: { userVerification: true },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch: boolean = bcrypt.compareSync(password, user.password);

    if (isMatch) throw new UnauthorizedException('Invalid credentials');

    return user as Omit<User, 'password'>;
  }

  async login(user: Omit<User, 'password'>) {
    return {
      ...user,
      access_token: this.jwtService.sign(user),
    };
  }

  async register(createUserDto: CreateUserDto) {
    return this.databaseService.$transaction(async (prisma) => {
      let existingUser = await prisma.user.findUniqueOrThrow({
        where: { email: createUserDto.email },
        include: { userVerification: true },
      });

      if (!existingUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, confirmPassword, ...rest } = createUserDto;
        const hashPass = await bcrypt.hash(password, 10);
        await prisma.user.create({
          data: {
            ...rest,
            password: hashPass,
            userVerification: {
              create: setOtp(),
            },
          },
          include: { userVerification: true },
        });

        existingUser = await prisma.user.findUnique({
          where: { email: createUserDto.email },
          include: { userVerification: true },
        });

        await this.mailService.sendOtpMail({
          email: existingUser.email,
          role: existingUser.role,
          name: existingUser.name,
          otp: existingUser.userVerification.otpCode,
          token: existingUser.userVerification.token,
        });
        return existingUser;
      }
    });
    // const newUser = await this.userService.create(createUserDto);
  }
}
