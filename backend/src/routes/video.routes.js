import { Router } from "express";
import { getVideo } from "../controller/video.controller.js";
const router = Router();

router.route("/:id").get(getVideo);

export default router;
