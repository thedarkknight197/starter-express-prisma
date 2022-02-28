import postsRoutes from "./posts";
import productRoutes from "./product";
import feedRoutes from "./feed";
import userRoutes from "./user";
import express from "express";

const routes = express.Router();

routes.use("/feed", feedRoutes);
routes.use("/post", postsRoutes);
routes.use("/product", productRoutes);
routes.use("/user", userRoutes);

export default routes;