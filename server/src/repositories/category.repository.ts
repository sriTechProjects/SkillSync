import { prisma } from "../config/prisma";
import { Category, CategorySuggestion } from "@prisma/client";

class CategoryRepository {
  public async findByName(name: string): Promise<Category | null> {
    return prisma.category.findUnique({ where: { name } });
  }

  public async create(name: string): Promise<Category> {
    return prisma.category.create({ data: { name } });
  }

  public async findAll(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  public async createSuggestion(name: string, userId: string): Promise<CategorySuggestion> {
    return prisma.categorySuggestion.create({
      data: {
        name,
        submittedByUser: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async findSuggestionByName(name: string): Promise<CategorySuggestion | null> {
    return prisma.categorySuggestion.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }

  public async findSuggestionById(id: string): Promise<CategorySuggestion | null> {
    return prisma.categorySuggestion.findFirst({
      where: {
        id: id,
      },
    });
  }

  public async getAllSuggestions(): Promise<CategorySuggestion[]> {
    return prisma.categorySuggestion.findMany({
      where: {
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public async acceptSuggestion(categoryId: string) {
    return prisma.categorySuggestion.update({
      data: {
        status: "ACCEPTED",
      },
      where: {
        id: categoryId,
      },
    });
  }
}

export const categoryRepository = new CategoryRepository();
