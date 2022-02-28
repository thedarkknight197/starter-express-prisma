import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from "express";
import { body } from "express-validator/check";
import AuthController from "../controllers/AuthController/AuthController";

const router = express.Router()

const authController = new AuthController();


router.post('/register', [
        body('email').isEmail().withMessage("Inserisci una mail valida name@server.com").custom(async (value: string, {req}) => {
            const user = new PrismaClient().user.findUnique({where: {
                email: value
            }})
            if (await Promise.resolve(user)) {
                return Promise.reject("Email esistente")
            }
        }),
        body('username').trim().not().isEmpty().withMessage("Username non vuoto").custom(async (value: string, {req}) => {
            const user = new PrismaClient().user.findUnique({where: {
                username: value
            }})
            if (await Promise.resolve(user)) {
                return Promise.reject("Username esistente")
            }
        }),
        body('name').trim().not().isEmpty().withMessage("Name non vuoto"),
        body('password').trim().isLength({min: 5}).withMessage("Password > 5 caratteri"),
    ], async (req: Request, res: Response) => await authController.registerUser(req, res));

router.post('/login', [
        body('email').isEmail().withMessage("Inserisci una mail valida name@server.com"),
        body('password').trim().isLength({min: 5}).withMessage("Password > 5 caratteri"),
    ], async (req: Request, res: Response) => await authController.loginUser(req, res));


export default router;