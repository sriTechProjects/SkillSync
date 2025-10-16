import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { userService } from '../services/user.service';
import { UpdateUserDto } from '../dtos/user/update-user.dto';


class UserController {
  public async getProfile(req: Request, res: Response): Promise<Response> {
    const userProfile = req.user;

    return res.status(200).json(userProfile);
  }

  public async updateProfile(req: Request, res: Response): Promise<Response> {
    const updateUserDto = plainToInstance(UpdateUserDto, req.body);
    const errors = await validate(updateUserDto);

    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
      return res.status(400).json({ message: 'Validation failed', errors: errorMessages });
    }

    try {
      // Get the user ID from the middleware-attached user object
      const userId = req.user!.id;
      const updatedUser = await userService.updateProfile(userId, updateUserDto);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      console.log(error);
      if (error.message.includes('already taken')) {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const userController = new UserController();