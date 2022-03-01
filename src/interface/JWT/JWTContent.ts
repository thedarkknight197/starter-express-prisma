import { JwtPayload } from "jsonwebtoken";

export interface JWTContent extends JwtPayload{
    id: number;
    email: string;
    name: string;
    iat: number; 
    exp: number;
}