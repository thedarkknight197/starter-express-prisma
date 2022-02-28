import postsRoutes from "./posts";
import productRoutes from "./product";
import feedRoutes from "./feed";
import userRoutes from "./user";
import authRoutes from "./auth";
import express from "express";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/feed", feedRoutes);
routes.use("/post", postsRoutes);
routes.use("/product", productRoutes);
routes.use("/user", userRoutes);


export default routes;