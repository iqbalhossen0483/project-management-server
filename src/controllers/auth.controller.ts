import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { TypeORM } from '../config/database.config';
import statusCodes from '../config/statusCodes';
import { User } from '../entity/user.entity';
import { RegisterDto } from '../validations/auth.validations';

class AuthController {
  private userRepository = TypeORM.getRepository(User);
  constructor() {
    this.register = this.register.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      const payload: RegisterDto = req.body;

      const isExist = await this.userRepository.findOne({
        where: { email: payload.email },
      });
      if (isExist) {
        throw {
          status: statusCodes.CONFLICT,
          message: 'User already exists',
        };
      }

      const hasedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hasedPassword;

      const user = this.userRepository.create(payload);
      const { password, ...rest } = await this.userRepository.save(user);

      res.status(statusCodes.CREATED).json({
        message: 'User created successfully',
        success: true,
        data: rest,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthController();
