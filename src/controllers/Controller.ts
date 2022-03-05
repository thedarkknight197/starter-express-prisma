import { PrismaClient } from "@prisma/client";

abstract class Controller {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}

export default Controller;
