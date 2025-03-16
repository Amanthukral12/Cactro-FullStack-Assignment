import { Router } from "express";
import { getLogs } from "../controller/log.controller.js";

const router = Router();

router.route("/").get(getLogs);

export default router;
