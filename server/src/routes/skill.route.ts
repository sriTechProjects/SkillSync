import { authMiddleware, optionalAuthMiddleware } from "../middlewares/auth.middleware";
import { skillController } from "../controllers/skill.controller";
import { Router } from "express";

const router = Router();

router.get('/offered', optionalAuthMiddleware,skillController.getAllOfferedSkills);
router.post('/offered', authMiddleware, skillController.createSkillOffered);
router.get('/offered/my', authMiddleware, skillController.getMyOfferedSkills);
router.get('/offered/:id', skillController.getSkillDetailById);

export default router;