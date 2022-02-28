import { PrismaClient } from '@prisma/client';
import { NextFunction,  Request,  Response } from "express";
import Controller from "../controllers/Controller";
import { RequestUser } from '../interface/request/RequestUserInterface';

const jwt = require("jsonwebtoken");

class IsAuth{
    
    public static async verify(req: RequestUser, res: Response, next: NextFunction) {
        const prisma = new PrismaClient();
        const authorization = req.get('Authorization');

        if (!authorization) {
            return res.status(401).json({
                msg: "Non autorizzato"
            })
        }
        
        const token: string = authorization.split(' ')[1];
        
        let decode;
        
        try {
            decode = jwt.verify(token, process.env["JWT_SECRET"]);
        } catch (error) {
            return res.status(500).json({
                msg: "Non autorizzato!!"
            })
        }
        
        if (!decode) {
            return res.status(401).json({
                msg: "Non autorizzato!!"
            });
        }

        let userId = decode.id;

        const user = await prisma.user.findFirst({where: {id: userId}});
        if (user) {
            req.user = user;
            console.log(req.user);
            next();
        } else {
            res.status(422).json({errors: "Not allowed"});
        }
    }
}

export default IsAuth;

