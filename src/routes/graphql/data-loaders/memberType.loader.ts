import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchAllMemberTypes = async (prisma: PrismaClient, keys: readonly string[]) => {
  return prisma.memberType.findMany({
    where: { id: { in: [...keys] } },
  });
};

export const createMemberTypesLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: readonly string[]) => {
    const memberTypes = await batchAllMemberTypes(prisma, keys);
    return keys.map((key) => memberTypes.find((type) => key === type.id));
  });
};
