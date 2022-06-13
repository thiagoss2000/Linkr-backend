import { Router } from "express";

const helloWorld = Router();

helloWorld.get("/");

export default helloWorld;
