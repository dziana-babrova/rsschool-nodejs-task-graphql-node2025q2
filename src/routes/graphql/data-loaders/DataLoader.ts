import { PrismaClient } from '@prisma/client';
import { createPostsloader } from './Post.loader.js';
import { createMemberTypesLoader } from './memberType.loader.js';
import { createProfilesloader } from './Profile.loader.js';
import { createUsersloader } from './User.loader.js';

export const createDataloaders = (prisma: PrismaClient) => {
  return {
    allMemberTypesLoader: createMemberTypesLoader(prisma),
    allPostsLoader: createPostsloader(prisma),
    allProfilesLoader: createProfilesloader(prisma),
    allUsersLoader: createUsersloader(prisma),
  };
};
