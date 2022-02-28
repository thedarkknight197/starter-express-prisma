import { Prisma, PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from "express"
import Controller from '../Controller';

class FeedController extends Controller{

    public async allPosts(req: Request, res: Response, next: NextFunction) {
        // /feed?searchString={searchString}&take={take}&skip={skip}&orderBy={orderBy}
        const { searchString, skip, take, orderBy } = req.query
        
        
        const or: Prisma.PostWhereInput = searchString
            ? {
                OR: [
                    { title: { contains: searchString as string } },
                    { content: { contains: searchString as string } },
                ],
            }
            : {}
        
        const posts = await this.prisma.post.findMany({
            where: {
                published: true,
                ...or,
            },
            include: { author: true },
            take: Number(take) || undefined,
            skip: Number(skip) || undefined,
            orderBy: {
                updatedAt: orderBy as Prisma.SortOrder,
            },
        })
        
        res.json(posts)
    }
    
}

export default FeedController;