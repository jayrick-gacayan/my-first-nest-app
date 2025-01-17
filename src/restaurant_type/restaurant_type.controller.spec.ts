import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantTypeController } from './restaurant_type.controller';

describe('RestaurantTypeController', () => {
  let controller: RestaurantTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantTypeController],
    }).compile();

    controller = module.get<RestaurantTypeController>(RestaurantTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
