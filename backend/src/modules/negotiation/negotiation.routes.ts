import { Router } from "express";
import {
  sendNegotiationMessage,
  getNegotiationThread,
} from "./negotiation.controller.js";
import { protect } from "../../middlewares/requireAuth.js";

const router = Router();

router.use(protect);

router.post("/:rfqId/messages", sendNegotiationMessage);
router.get("/:rfqId/messages", getNegotiationThread);

export default router;
