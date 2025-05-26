import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchAllProfiles = async (prisma: PrismaClient, keys: readonly string[]) => {
  return prisma.profile.findMany({
    where: { userId: { in: [...keys] } },
  });
};

export const createProfilesloader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: readonly string[]) => {
    const profiles = await batchAllProfiles(prisma, keys);
    return keys.map((key) => profiles.find((profile) => key === profile.userId));
  });
};
