import { Router } from "express";
import { getVideo, updateTitle } from "../controller/video.controller.js";
const router = Router();

router.route("/:id").get(getVideo);
router.route("/updateTitle").put(updateTitle);

export default router;
