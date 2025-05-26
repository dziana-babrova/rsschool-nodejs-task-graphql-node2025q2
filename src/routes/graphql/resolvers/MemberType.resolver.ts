import { Context, Profile } from '../ts-types.js';

export const getAllMemberTypes = async (
  _parent: unknown,
  _args: unknown,
  { prisma }: Context,
) => {
  return prisma.memberType.findMany();
};

export const getMemberType = async (
  _parent: unknown,
  { id }: { id: string },
  { prisma }: Context,
) => {
  const memberType = await prisma.memberType.findUnique({
    where: {
      id,
    },
  });
  return memberType;
};

export const getMemberTypeByProfile = async (
  { memberTypeId }: Profile,
  _args: unknown,
  { loaders }: Context,
) => {
  return loaders.allMemberTypesLoader.load(memberTypeId);
};
