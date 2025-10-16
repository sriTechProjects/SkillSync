import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { userRepository } from "../repositories/user.repository";

interface JWTPayLoad{
    id:string;
}

export const authMiddleware = async(req: Request, res: Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    // console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    // console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayLoad;
        const user = await userRepository.findById(decoded.id);
        console.log(user);

        if(!user){
            return res.status(401).json({ message: 'Unauthorized: User not found.' });
        }

        const {passwordHash, ...userWithoutPassword} = user;
        req.user = userWithoutPassword;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
}

export const optionalAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // No token provided, just proceed to the next handler
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayLoad;
    const user = await userRepository.findById(decoded.id);

    if (user) {
      // If user is found, attach them to the request
      const { passwordHash, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;
    }
  } catch (error) {
    // If token is invalid, do nothing. The request proceeds as if no token was sent.
  }

  return next();
};