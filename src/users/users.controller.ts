import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { Roles } from './roles/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async user(@Request() req, @Param('email') email: string) {
    return this.userService.user({ email: email });
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
