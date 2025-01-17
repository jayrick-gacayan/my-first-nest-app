import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './seeders/admin_seeder';
import { seedRestaurantType } from './seeders/restaurant_type_seeder';
import { seedServiceType } from './seeders/service_type_seeder';

const prisma = new PrismaClient();

async function main() {
  await seedAdmin(prisma);
  await seedRestaurantType(prisma);
  await seedServiceType(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
