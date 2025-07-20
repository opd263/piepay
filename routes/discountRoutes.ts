import { Router } from "express";
import { getHighestDiscount } from "../controllers/discountController";

const router = Router();
router.get("/", getHighestDiscount);
export default router;