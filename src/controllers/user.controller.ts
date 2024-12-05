import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import TYPES from "../configs/types";
import { UserService } from "../services/user.service";
import ResponseHandler from "../utils/response-handler";
import { SUCCESS_MESSAGES } from "../constants/messages";

@injectable()
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      ResponseHandler.sendResponse({
        res,
        statusCode: 200,
        message: SUCCESS_MESSAGES.USERS_FETCHED,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(parseInt(id, 10));
      ResponseHandler.sendResponse({
        res,
        statusCode: 200,
        message: SUCCESS_MESSAGES.USER_FETCHED,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.createUser(req.body);
      ResponseHandler.sendResponse({
        res,
        statusCode: 201,
        message: SUCCESS_MESSAGES.USER_CREATED,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}
