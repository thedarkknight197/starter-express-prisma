import { Prisma, User } from '@prisma/client';
import { Request, Response } from "express";
import { validationResult } from "express-validator/check";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Controller from "../Controller";

class AuthController extends Controller {

    public async registerUser(req:Request, res: Response) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({errors: error})
        }

        const { username, name, password, email } = req.body;

        bcrypt.hash(password, 12).then(async(hashedPassword: string)=>{
            try {
                const result: User = await this.prisma.user.create({
                    data: {
                        username,
                        name,
                        password: hashedPassword,
                        email,
                    },
                })
                res.status(201).json({"msg": "Success operation", result})
            } catch (error) {
                return res.status(422).json({errors: error})
            }
        }).catch((error: string) => res.status(422).json({errors: error}))
    }
    
    public async loginUser(req:Request, res: Response) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({errors: error})
        }
        const {email, password} = req.body;

        const fields : Prisma.UserWhereInput = {
            email
        }

        const user: User | null = await this.prisma.user.findFirst({
            where: {
                ...fields
            }
        })

        if (!user) {
            return res.status(401).json({msg: "Non autorizzato, email errata!"})
        } else {
            const isEqual: Boolean = await bcrypt.compare(password, user.password);
            
            if (!isEqual) {
                return res.status(422).json({msg: "Non autorizzato, password non corretta!"})
            } else {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                }, process.env.JWT_SECRET ?? "", {expiresIn: '1h'});
                return res.status(201).json({
                    msg: "Sei Loggato",
                    id: user.id,
                    token,
                });
            }
        }
    }
}

export default AuthController;