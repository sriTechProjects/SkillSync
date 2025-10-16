import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { categoryService } from "../services/category.service";
import { SuggestCategoryDTO } from "../dtos/category/suggest-category";

class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createCategoryDto = plainToInstance(CreateCategoryDto, req.body);
    const errors = await validate(createCategoryDto);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => Object.values(e.constraints || {})).flat();
      return res.status(400).json({ message: "Validation failed", errors: errorMessages });
    }

    try {
      const newCategory = await categoryService.createCategory(createCategoryDto);
      return res.status(201).json(newCategory);
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(200).json(categories);
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async suggest(req: Request, res: Response): Promise<Response> {
    const suggestCategoryDto = plainToInstance(SuggestCategoryDTO, req.body);
    const errors = await validate(suggestCategoryDto);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => Object.values(e.constraints || {})).flat();
      return res.status(400).json({ message: "Validation failed", errors: errorMessages });
    }

    try {
      const userId = req.user!.id; // From authMiddleware
      const newSuggestion = await categoryService.suggestCategory(userId, suggestCategoryDto);
      return res.status(201).json({
        message: "Thank you! Your category suggestion has been submitted for review.",
        suggestion: newSuggestion,
      });
    } catch (error: any) {
      if (error.message.includes("already exists") || error.message.includes("already been suggested")) {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async getSuggestions(req: Request, res: Response): Promise<Response> {
    try {
      const suggestions = await categoryService.getSuggestions();
      return res.status(200).json({
        categorySuggestion: suggestions,
      });
    } catch (error: any) {
      if (error.message.includes("already exists") || error.message.includes("already been suggested")) {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export const categoryController = new CategoryController();
