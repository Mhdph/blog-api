import express, { Request } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import authRoute from "./src/routes/auth";
import userRoute from "./src/routes/users";
import postRoute from "./src/routes/post";
import categoryRoute from "./src/routes/category";
const app = express();

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Could not connect to mongodb"));

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, "images");
  },
  filename: (req: Request, file: any, cb: Function) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("fiele has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/category", categoryRoute);

app.listen("5000", () => {
  console.log("Backend Is Runing");
});
