import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(prisma: PrismaClient) {
  await prisma.$transaction(async (transactionPrisma) => {
    const hashPass = await bcrypt.hash('Kodakollectiv1!', 10);

    const hasAdmin = await transactionPrisma.user.findUnique({
      where: { email: 'admin@email.none' },
    });

    if (!hasAdmin) {
      await transactionPrisma.user.create({
        data: {
          email: 'admin@email.none',
          password: hashPass,
          role: Role.ADMIN,
          isVerified: true,
          isActive: true,
          verifiedAt: new Date(),
        },
      });
    }
  });
}
