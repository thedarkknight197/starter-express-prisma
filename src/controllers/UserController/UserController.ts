import { Prisma, PrismaClient, User } from "@prisma/client";

class UserController {
  private user = new PrismaClient().user;

  public async where(where: Prisma.UserWhereUniqueInput) : Promise<User | null> {
    const user = await Promise.resolve(this.user.findUnique({
      where,
    }));
    return user;
  }
}

export default UserController;
