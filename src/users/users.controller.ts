import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  ValidationPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { Roles } from './roles/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  async user(@Param('id') id: string) {
    return this.userService.user({ id: id });
  }

  @Put(':id')
  @Roles(Role.USER)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) update_user: UpdateUserDto,
  ) {
    return this.userService.update(id, update_user);
  }
}
