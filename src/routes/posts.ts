import express, { Request, Response } from "express";
import PostController from "../controllers/PostController/PostController";

const router = express.Router();
const postController = new PostController();

router.post(`/`, async (req: Request, res: Response) => {await postController.createPost(req, res)})

router.get(`/:id`, async (req: Request, res: Response) => {await postController.getPost(req, res)})

router.delete(`/:id`, async (req: Request, res: Response) => {await postController.deletePost(req, res)})

router.put('/:id/views', async (req: Request, res: Response) => {await postController.setView(req, res)})

router.put('/:id/publish', async (req: Request, res: Response) => {await postController.publishPost(req, res)})

export default router;