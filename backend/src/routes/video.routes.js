import { Router } from "express";
import {
  addComment,
  deleteComment,
  getVideo,
  updateTitle,
} from "../controller/video.controller.js";
const router = Router();

router.route("/:id").get(getVideo);
router.route("/updateTitle").put(updateTitle);
router.route("/addComment").post(addComment);
router.route("/comment/:commentId").delete(deleteComment);

export default router;
