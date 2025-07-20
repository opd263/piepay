import { AppDataSource } from "../config/database";
import { Offer } from "../models/Offer";

export class OfferService {
  static async processOffers(payload: any): Promise<{ identifiedCount: number; newCount: number }> {
    // Flipkart API nests offers under offer_sections.PBO.offers
    const offersArray: any[] = payload.offer_sections?.PBO?.offers || [];
    const identifiedCount = offersArray.length;
    const repo = AppDataSource.getRepository(Offer);

    const newOffers: Offer[] = [];
    for (const data of offersArray) {
      const offerId = data.adjustment_id;
      const exists = await repo.findOneBy({ offerId });
      if (exists) continue;

      const offer = repo.create({
        offerId,
        adjustmentType: data.adjustment_type,
        summary: data.summary,
        paymentInstruments: data.contributors?.payment_instrument || [],
        banks: data.contributors?.banks || [],
        emiMonths: data.contributors?.emi_months || [],
        cardNetworks: data.contributors?.card_networks || [],
        imageUrl: data.image,
      });

      newOffers.push(offer);
    }

    if (newOffers.length) {
      await repo.save(newOffers);
    }

    return { identifiedCount, newCount: newOffers.length };
  }
}