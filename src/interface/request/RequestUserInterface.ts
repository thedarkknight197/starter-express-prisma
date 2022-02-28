import { User } from './../../../node_modules/.prisma/client/index.d';
import { Request } from "express";

export interface RequestUser extends Request {
    user?: User | undefined
}