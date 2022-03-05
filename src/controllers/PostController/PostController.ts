import { Post } from "@prisma/client";
import { Request, Response } from "express";
import Controller from "../Controller";

class PostController extends Controller {
  async createPost(req: Request, res: Response) {
    const { title, content, authorEmail } = req.body;
    try {
      const result: Post = await this.prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { email: authorEmail } },
        },
      });
      res.json(result);
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  async getPost(req: Request, res: Response) {
    const { id }: { id?: string } = req.params;

    const post: Post | null = await this.prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      res.status(404).json({ msg: `post ${id} not found` });
    } else {
      res.status(200).json(post);
    }
  }

  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    const post: Post = await this.prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(post);
  }

  async setView(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const post: Post = await this.prisma.post.update({
        where: { id: Number(id) },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      });

      res.json(post);
    } catch (error) {
      res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
  }

  async publishPost(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const postData: { published: boolean;} | null = await this.prisma.post.findUnique({
        where: { id: Number(id) },
        select: {
          published: true,
        },
      });

      const updatedPost: Post = await this.prisma.post.update({
        where: { id: Number(id) || undefined },
        data: { published: !postData?.published },
      });
      res.json(updatedPost);
    } catch (error) {
      res.json({
        error: `Post with ID ${id} does not exist in the database`,
      });
    }
  }
}

export default PostController;
