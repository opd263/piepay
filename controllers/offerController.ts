import { Request, Response } from "express";
import { OfferService } from "../services/offerService";

export const createOffers = async (req: Request, res: Response) => {
  try {
    const payload = req.body.flipkartOfferApiResponse;
    const { identifiedCount, newCount } = await OfferService.processOffers(payload);
    res.json({ noOfOffersIdentified: identifiedCount, noOfNewOffersCreated: newCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createOffersFromMock = async (req: Request, res: Response) => {
  try {
    const fs = await import("fs");
    const path = await import("path");
    const raw = fs.readFileSync(path.join(__dirname, "../data/mockFlipkartResponse.json"), "utf-8");
    const payload = JSON.parse(raw);

    const { identifiedCount, newCount } = await OfferService.processOffers(payload);
    res.json({ noOfOffersIdentified: identifiedCount, noOfNewOffersCreated: newCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load mock data" });
  }
};
