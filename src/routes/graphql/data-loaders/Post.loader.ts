import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const batchAllPosts = async (prisma: PrismaClient, keys: readonly string[]) => {
  return prisma.post.findMany({
    where: { authorId: { in: [...keys] } },
  });
};

export const createPostsloader = (prisma: PrismaClient) => {
  return new DataLoader(async (keys: readonly string[]) => {
    const posts = await batchAllPosts(prisma, keys);
    return keys.map((key) => posts.filter((post) => key === post.authorId));
  });
};
