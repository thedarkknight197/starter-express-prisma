import { Prisma, PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from "express"
import Controller from '../Controller';

class ProductController extends Controller {
    
    async createProduct (req: Request, res: Response) {
        const { name, sku, cost, price, categories, tags } = req.body
        try {
            const result = await this.prisma.product.create({
                data: {
                    name: name,
                    sku: sku,
                    cost: cost,
                    price: price,
                    categories: categories,
                    tags: tags
                },
            })
            res.json(result)
        } catch (error) {
            res.status(404).json({error: error});
        }
    }
    
    async getProduct (req: Request, res: Response){
        const { id }: { id?: string } = req.params

        const post = await this.prisma.product.findUnique({
            where: { id: Number(id) },
        })

        if (post) {
            res.json(post)    
        } else {
            res.status(404).json({"msg": "Product don't found"});
        }

    }
    
    async allProduct (req: Request, res: Response){
        const post = await this.prisma.product.findMany({});

        res.json(post);
    }
    
    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params
        const post = await this.prisma.product.delete({
            where: {
                id: Number(id),
            },
        })
        res.json(post)
    }
}

export default ProductController;