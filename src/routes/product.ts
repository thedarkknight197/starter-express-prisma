import express, { Request, Response } from "express";
import ProductController from "../controllers/ProductController/ProductController";

const router = express.Router();

const productController = new ProductController();

router.get(`/`, async (req: Request, res: Response) => {await productController.allProduct(req, res)})

router.post(`/`, async (req: Request, res: Response) => {await productController.createProduct(req, res)})

router.get(`/:id`, async (req: Request, res: Response) => {await productController.getProduct(req, res)})

router.delete(`/:id`, async (req: Request, res: Response) => {await productController.deleteProduct(req, res)})

export default router;