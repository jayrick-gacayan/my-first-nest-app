import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { RestaurantTypeModule } from './restaurant_type/restaurant_type.module';

@Module({
  imports: [CatsModule, RestaurantTypeModule, AppModule],
})
export class AppModule {}
