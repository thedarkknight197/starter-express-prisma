import express, { Request, Response } from "express";
import ProductController from "../controllers/ProductController/ProductController";
import { body } from "express-validator/check";

const router = express.Router();

const productController = new ProductController();

router.get(`/`, async (req: Request, res: Response) => {await productController.allProduct(req, res)})

router.post(`/`, [
        body('name').trim()
            .isLength({min: 3})
            .withMessage("Nome maggiore di 3 caratteri")
            .exists().withMessage("Titolo è richiesto"),
        body('sku').trim()
            .isLength({min: 3}).withMessage("SKU maggiore di 3 caratteri")
            .exists().withMessage("SKU è richiesto"),
        body('cost').default(0.0),
        body('price').trim().isDecimal().exists().withMessage("Prezzo è richiesto"),
    ],
    async (req: Request, res: Response) => {await productController.createProduct(req, res)})

router.get(`/:id`, async (req: Request, res: Response) => {await productController.getProduct(req, res)})

router.delete(`/:id`, async (req: Request, res: Response) => {await productController.deleteProduct(req, res)})

export default router;