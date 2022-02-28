import express from "express";
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = express.Router();


router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})
    
router.get('/:id/drafts', async (req, res) => {
    const { id } = req.params
    
    const drafts = await prisma.user
        .findUnique({
            where: {
                id: Number(id),
            },
        })
        .posts({
            where: { published: false },
        })
    
    res.json(drafts)
})

/** 
    posts: {
        create: postData,
    },
*/

export default router;