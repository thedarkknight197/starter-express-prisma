import express, { Request, Response } from "express";
import { body } from "express-validator/check";
import AuthController from "../controllers/AuthController/AuthController";
import UserController from "../controllers/UserController/UserController";
import CustomError from "../interface/errors/CustomError";

const router = express.Router();

const authController = new AuthController();
const userController = new UserController();

router.post("/register", [

  body("email").isEmail().withMessage("Inserisci una mail valida name@server.com").custom(async (value: string) => {
    const user = await userController.where({
      email: value,
    });
    return user ? Promise.reject(new CustomError("Email esistente")) : true;
  }),

  body("username").trim().not().isEmpty()
    .withMessage("Username non vuoto")
    .custom(async (value: string) => {
      const user = await userController.where({
        username: value,
      });
      return user ? Promise.reject(new CustomError("Email esistente")) : true;
    }),

  body("name").trim().not().isEmpty()
    .withMessage("Name non vuoto"),

  body("password").trim().isLength({ min: 5 }).withMessage("Password > 5 caratteri"),
], async (req: Request, res: Response) => authController.registerUser(req, res));

router.post("/login", [
  body("email").isEmail().withMessage("Inserisci una mail valida name@server.com"),
  body("password").trim().isLength({ min: 5 }).withMessage("Password > 5 caratteri"),
], async (req: Request, res: Response) => authController.loginUser(req, res));

export default router;
