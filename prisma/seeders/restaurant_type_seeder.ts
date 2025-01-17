import { PrismaClient } from '@prisma/client';
import { RESTAURANT_TYPES } from 'constants/restaurant-types';

export async function seedRestaurantType(prisma: PrismaClient) {
  await prisma.$transaction(async (transactionPrisma) => {
    const createPromises = RESTAURANT_TYPES.map(async (typeData) => {
      const restaurantType = await transactionPrisma.restaurantType.create({
        data: {
          translations: {
            create: Object.entries(typeData.translations).map(
              ([lang, name]) => {
                return {
                  lang,
                  name,
                  translatableType: 'RestaurantType',
                  translatableId: restaurantType.id,
                };
              },
            ),
          },
        },
        include: { translations: true },
      });

      return restaurantType;
    });

    await Promise.all(createPromises);
  });
}
