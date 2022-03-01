import { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        JWT_SECRET: string;
      }
    }
  }
  
export {}
  