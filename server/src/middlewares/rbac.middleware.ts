import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';

export const checkRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action.' });
    }

    next();
  };
};
