import { Router } from "express";
import {
  sendNegotiationMessage,
  getNegotiationThread,
} from "./negotiation.controller";
import { requireAuth } from "../../middlewares/requireAuth";

const router = Router();

router.use(requireAuth);

router.post("/:rfqId/messages", sendNegotiationMessage);
router.get("/:rfqId/messages", getNegotiationThread);

export default router;
