import { Request, Response } from "express";
import { validationResult } from "express-validator/check";
import Controller from "../Controller";

class ProductController extends Controller {
  async createProduct(req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Errore input",
        error: errors,
      });
    }

    const {
      name, sku, cost, price, categories, tags,
    } = req.body;
    try {
      const result = await this.prisma.product.create({
        data: {
          name,
          sku,
          cost,
          price,
          categories,
          tags,
        },
      });
      return res.json(result);
    } catch (error) {
      return res.status(404).json({ error });
    }
  }

  async getProduct(req: Request, res: Response) {
    const { id }: { id?: string } = req.params;

    const post = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ msg: "Product don't found" });
    }
  }

  async allProduct(req: Request, res: Response) {
    const post = await this.prisma.product.findMany({});

    res.json(post);
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    const post = await this.prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    return res.json(post);
  }
}

export default ProductController;
