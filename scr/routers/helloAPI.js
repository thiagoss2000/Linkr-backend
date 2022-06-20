import { Router } from "express";

const helloWorld = Router();

helloWorld.get("/", helloWorld);

export default helloWorld;
