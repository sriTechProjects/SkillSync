import { Category, CategorySuggestion } from "@prisma/client";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { categoryRepository } from "../repositories/category.repository";
import { SuggestCategoryDTO } from "../dtos/category/suggest-category";

class CategoryService {
  public async createCategory(data: CreateCategoryDto): Promise<Category> {
    const existingCategory = await categoryRepository.findByName(data.name);
    if (existingCategory) {
      throw new Error("Category with this name already exists.");
    }
    return categoryRepository.create(data.name);
  }

  public async getAllCategories(): Promise<Category[]> {
    return categoryRepository.findAll();
  }
  public async suggestCategory(userId: string, data: SuggestCategoryDTO): Promise<CategorySuggestion> {
    const existingCategory = await categoryRepository.findByName(data.name);
    if (existingCategory) {
      throw new Error("This category already exists.");
    }

    const existingSuggestion = await categoryRepository.findSuggestionByName(data.name);
    if (existingSuggestion && existingSuggestion.status === "PENDING") {
      throw new Error("This category has already been suggested and is pending review.");
    }

    return categoryRepository.createSuggestion(data.name, userId);
  }
  public async getSuggestions(): Promise<CategorySuggestion[]> {
    const categories = await categoryRepository.getAllSuggestions();
    if (!categories) {
      throw new Error("No Suggestions Yet");
    }

    return categories;
  }

  public async acceptSuggestion(categoryId: string){
    const category = await categoryRepository.findSuggestionById(categoryId);
    if(!category){
      throw new Error("No Category found");
    }
    return categoryRepository.acceptSuggestion(categoryId);
  }
}

export const categoryService = new CategoryService();
