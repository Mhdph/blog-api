import express, { Request, Response } from "express";
import Category from "../models/Category";
const router = express.Router();

// Create Category

router.post("/", async (req: Request, res: Response) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get

router.get("/", async (req: Request, res: Response) => {
  try {
    const cats = await Category.find();
    res.status(200).send(cats);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
