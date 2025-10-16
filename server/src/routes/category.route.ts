import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/rbac.middleware';
import { categoryController } from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.post('/suggest', authMiddleware, categoryController.suggest);
categoryRouter.post('/', authMiddleware, checkRole(["ADMIN"]),categoryController.create);
categoryRouter.get('/suggest', authMiddleware, checkRole(["ADMIN"]), categoryController.getSuggestions);

export default categoryRouter;