import { PrismaClient, ServiceType } from '@prisma/client';

export async function seedServiceType(prisma: PrismaClient) {
  await prisma.$transaction(async (transactionPrisma) => {
    const serviceTypeCount = await transactionPrisma.service.count();

    if (serviceTypeCount === 0) {
      await transactionPrisma.service.createMany({
        data: Object.values(ServiceType).map((name) => ({
          name,
        })),
      });
    }
  });
}
