import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateSkillOfferedDto } from '../dtos/skill/create-skill-offered.dto';
import { skillService } from '../services/skill.service';

class SkillController {
  public async createSkillOffered(req: Request, res: Response): Promise<Response> {
    const createSkillDto = plainToInstance(CreateSkillOfferedDto, req.body);
    const errors = await validate(createSkillDto);

    if (errors.length > 0) {
      const errorMessages = errors.map((e) => Object.values(e.constraints || {})).flat();
      return res.status(400).json({ message: 'Validation failed', errors: errorMessages });
    }

    try {
      // req.user.id is added by the authMiddleware
      const userId = req.user!.id;
      const newSkill = await skillService.createSkillOffered(userId, createSkillDto);
      return res.status(201).json(newSkill);
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  public async getAllOfferedSkills(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      console.log(userId);
      const skills = await skillService.getAllOfferedSkills(userId);
      return res.status(200).json(skills);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  // This method gets skills for ONLY the logged-in user
  public async getMyOfferedSkills(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const skills = await skillService.getSkillsOffered(userId);
      return res.status(200).json(skills);
    } catch (error: any) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  public async getSkillDetailById(req: Request, res:Response): Promise<Response>{
    try {
      const skillId = req.params.id;
      const skillDetails = await skillService.getSkillDetails(skillId);
      return res.status(200).json(skillDetails);
    } catch (error: any) {
      console.log(error)
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
}

export const skillController = new SkillController();