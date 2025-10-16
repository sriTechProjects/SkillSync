import { SkillOffered } from "@prisma/client";
import { CreateSkillOfferedDto } from "../dtos/skill/create-skill-offered.dto";
import { skillRepository } from "../repositories/skill.repository";

class SkillService {
  public async createSkillOffered(userId: string, data: CreateSkillOfferedDto): Promise<SkillOffered> {
    const skillData = {
      ...data,
      providerId: userId, // Link the skill to the logged-in user
    };
    return skillRepository.createOffered(skillData);
  }

  public async getSkillsOffered(userId: string): Promise<SkillOffered[]>{
    return skillRepository.getOfferedSkills(userId);
  }

  public async getAllOfferedSkills(userId: string): Promise<SkillOffered[]> {
    return skillRepository.findAllOffered(userId);
  }

  public async getSkillDetails(skillId:string): Promise<SkillOffered | null>{
    return skillRepository.findSkillById(skillId);
  }
}

export const skillService = new SkillService();