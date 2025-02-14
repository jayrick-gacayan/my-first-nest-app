import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { setOtp } from 'helpers/set-otp';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: createUserDto.email },
      include: { userVerification: true },
    });

    if (user) {
      throw new BadRequestException('This email is already registered.');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, confirmPassword, ...rest } = createUserDto;
      const hashPass = await bcrypt.hash(password, 10);

      const newUser = await this.databaseService.user.create({
        data: {
          ...rest,
          password: hashPass,
          userVerification: {
            create: setOtp(),
          },
        },
        omit: { password: true },
        include: { userVerification: true },
      });

      return newUser;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    omitPassword: boolean = true,
  ) {
    const user = await this.databaseService.user.findUnique({
      where: userWhereUniqueInput,
      omit: { password: omitPassword },
      include: { userVerification: true },
    });

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    omitPassword?: boolean;
  }) {
    const { skip, take, cursor, where, orderBy, omitPassword = true } = params;

    return this.databaseService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      ...(omitPassword && { omit: { password: true } }),
    });
  }
}
