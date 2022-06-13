import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helloWorld from "./routers/helloAPI.js";

dotenv.config();
const app = express();

app.use(json());
app.use(cors());
app.use(helloWorld);

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
