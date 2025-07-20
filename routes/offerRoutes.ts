import { Router } from "express";
import { createOffers, createOffersFromMock } from "../controllers/offerController";

const router = Router();

router.post("/", createOffers);
router.get("/mock", createOffersFromMock);

export default router;
