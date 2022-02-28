import express, { NextFunction, Request, Response } from "express";
import FeedController from "../controllers/FeedController/FeedController";

const router = express.Router();

const feedController = new FeedController();

router.get('/', async (req: Request, res: Response, next: NextFunction) => await feedController.allPosts(req, res, next));

export default router;