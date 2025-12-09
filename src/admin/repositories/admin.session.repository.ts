import { prisma } from "../../../db/prisma";
import { Prisma } from "@prisma/client";

export class AdminSessionRepository {
  async createSession(adminId: number, ipAddress?: string, userAgent?: string) {
    return prisma.adminSession.create({
      data: {
        admin: { connect: { id: adminId } },
        ipAddress,
        userAgent,
      },
    });
  }

  async findAll() {
    return prisma.adminSession.findMany();
  }

  async findById(id: number) {
    return prisma.adminSession.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.AdminSessionUpdateInput) {
    return prisma.adminSession.update({
      where: { id: id },
      data,
    });
  }
}
