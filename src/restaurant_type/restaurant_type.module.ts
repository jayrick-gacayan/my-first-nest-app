import { Module } from '@nestjs/common';
import { RestaurantTypeService } from './restaurant_type.service';
import { RestaurantTypeController } from './restaurant_type.controller';

@Module({
  providers: [RestaurantTypeService],
  controllers: [RestaurantTypeController],
})
export class RestaurantTypeModule {}
