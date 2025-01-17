import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RestaurantTypeService {
  constructor(private prisma: PrismaService) {}

  async findAll(lang: string = 'en') {
    return this.prisma.restaurantType.findMany({
      include: { translations: { where: { lang } } },
    });
  }
}
