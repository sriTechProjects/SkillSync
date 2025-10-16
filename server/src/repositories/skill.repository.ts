import { prisma } from "../config/prisma";
import { SkillOffered } from "@prisma/client";

class SkillRepository {
  public async createOffered(data: any): Promise<SkillOffered> {
    return prisma.skillOffered.create({
      data: {
        title: data.title,
        description: data.description,
        creditValue: data.creditValue,
        sessionType: data.sessionType,
        provider: {
          connect: { id: data.providerId },
        },
        category: {
          connect: { id: data.categoryId },
        },
      },
    });
  }

  public async getOfferedSkills(id: string): Promise<SkillOffered[]> {
    return prisma.skillOffered.findMany({
      where: {
        providerId: id,
      },
    });
  }

  public async findAllOffered(id: string): Promise<SkillOffered[]> {
    const skills = await prisma.skillOffered.findMany({
      where: {
        providerId: {
          not: id,
        },
      },
      include: {
        provider: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map the results to rename `category.name` -> `categoryName`
    return skills.map((skill) => ({
      ...skill,
      providerId: skill.provider.id,
      username: skill.provider.username,
      profilePicture: skill.provider.profilePicture,
      categoryName: skill.category.name,
      provider: undefined,
      category: undefined,
    }));
  }

  public async findSkillById(id: string): Promise<SkillOffered | null> {
    return prisma.skillOffered.findUnique({
      where: {
        id: id,
      },
      include: {
        provider: {
          select: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
      },
    });
  }
}

export const skillRepository = new SkillRepository();
