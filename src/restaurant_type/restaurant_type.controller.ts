import { Controller, Get, Query } from '@nestjs/common';
import { RestaurantTypeService } from './restaurant_type.service';

@Controller('restaurant-type')
export class RestaurantTypeController {
  constructor(private readonly restaurantTypeService: RestaurantTypeService) {}

  @Get()
  findAll(@Query('lang') lang: string = 'en') {
    return this.restaurantTypeService.findAll(lang);
  }
}
