import { PrismaClient } from '@prisma/client';
import { NextFunction,  Request,  Response } from "express";
import { RequestUser } from '../interface/request/RequestUserInterface';
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWTContent } from '../interface/JWT/JWTContent';

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
        
        let decode: string|JwtPayload;
        let jwtDecoded: JWTContent;
        
        try {
            const secret : string = process.env.JWT_SECRET ?? "";            
            decode = jwt.verify(token, secret)
            jwtDecoded = <JWTContent>decode;
        } catch (error) {
            return res.status(500).json({
                msg: "Non autorizzato!!",
                erros: error
            })
        }
        if (!jwtDecoded) {
            return res.status(401).json({
                msg: "Non autorizzato!!"
            });
        }
        
        let userId: number = jwtDecoded.id;

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
