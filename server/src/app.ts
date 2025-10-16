import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import authRouter from './routes/auth.route';
import userRoutes from './routes/user.route';
import skillRoutes from './routes/skill.route';
import categoryRoutes from './routes/category.route';

import { corsOptions } from './config/cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use('/api/auth', authRouter);
app.use('/api/users', userRoutes);  
app.use('/api/skills',skillRoutes);
app.use('/api/categories', categoryRoutes); 

app.get('/', (req, res) => {
  res.send('SkillSync API is running!');
});

export default app;