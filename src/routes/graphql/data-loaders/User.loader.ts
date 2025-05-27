import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchAllUsers = async (prisma: PrismaClient, keys: readonly string[]) => {
  return prisma.user.findMany({
    where: { id: { in: [...keys] } },
    include: {
      profile: true,
      posts: true,
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });
};

export const createUsersloader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: readonly string[]) => {
    const users = await batchAllUsers(prisma, keys);
    return keys.map((key) => users.find((user) => key === user.id));
  });
};
