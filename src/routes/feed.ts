import express, { Request, Response } from "express";
import FeedController from "../controllers/FeedController/FeedController";
import IsAuth from "../middleware/IsAuth";

const router = express.Router();

const feedController = new FeedController();

router.get("/", IsAuth.verify, async (req: Request, res: Response) => feedController.allPosts(req, res));

export default router;
