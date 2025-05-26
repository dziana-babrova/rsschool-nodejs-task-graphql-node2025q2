import { changeUserInputDto, Context, createUserInputDto, User } from '../ts-types.js';

export const getAllUsers = async (
  _parent: unknown,
  _args: unknown,
  { prisma }: Context,
) => {
  return prisma.user.findMany();
};

export const getUser = async (
  _parent: unknown,
  { id }: { id: string },
  { prisma }: Context,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      profile: true,
      posts: true,
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });
  return user;
};

export const getSubscriptions = async (
  { userSubscribedTo }: User,
  _args: unknown,
  { loaders }: Context,
) => {
  const subscriptions = userSubscribedTo?.map(({ authorId }) => authorId);
  if (subscriptions) return loaders.allUsersLoader.loadMany(subscriptions);
  return [];
};

export const getSubscribers = async (
  { subscribedToUser }: User,
  _args: unknown,
  { loaders }: Context,
) => {
  const subscribers = subscribedToUser?.map(({ subscriberId }) => subscriberId);
  if (subscribers) return loaders.allUsersLoader.loadMany(subscribers);
  return [];
};

export const deleteUser = async (
  _parent: unknown,
  { id }: { id: string },
  { prisma, loaders }: Context,
) => {
  loaders.allUsersLoader.clear(id);
  await prisma.user.delete({ where: { id } });
  return 'Deleted succesfully!';
};

export const createUser = async (
  _parent: unknown,
  { dto }: { dto: createUserInputDto },
  { prisma }: Context,
) => {
  const user = await prisma.user.create({
    data: dto,
  });
  return user;
};

export const updateUser = async (
  _parent: unknown,
  { dto, id }: { dto: changeUserInputDto; id: string },
  { prisma, loaders }: Context,
) => {
  loaders.allUsersLoader.clear(id);
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: dto,
  });
  return user;
};

export const subscribeTo = async (
  _parent: unknown,
  { userId, authorId }: { userId: string; authorId: string },
  { prisma, loaders }: Context,
) => {
  loaders.allUsersLoader.clear(userId);
  loaders.allUsersLoader.clear(authorId);
  await prisma.subscribersOnAuthors.create({
    data: {
      subscriberId: userId,
      authorId,
    },
  });

  return 'Subscribed successfully';
};

export const unsubscribeFrom = async (
  _parent: unknown,
  { userId, authorId }: { userId: string; authorId: string },
  { prisma, loaders }: Context,
) => {
  loaders.allUsersLoader.clear(userId);
  loaders.allUsersLoader.clear(authorId);
  await prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: userId,
        authorId,
      },
    },
  });
  return 'Unsubscribed successfully';
};
