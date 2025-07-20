import { AppDataSource } from "../config/database";
import { Offer } from "../models/Offer";
import { Like } from "typeorm";

export class DiscountService {
  static async calculateHighestDiscount(
    amount: number,
    bankName: string,
    paymentInstrument?: string
  ): Promise<number> {
    const repo = AppDataSource.getRepository(Offer);
    const where: any = { banks: Like(`%${bankName}%`) };
    if (paymentInstrument) {
      where.paymentInstruments = Like(`%${paymentInstrument}%`);
    }

    const offers = await repo.find({ where });
    let highest = 0;

    // Here we just compare flat amounts extracted from summary for simplicity
    for (const offer of offers) {
      const match = offer.summary.match(/₹(\d+)/);
      if (!match) continue;
      const discount = parseFloat(match[1]);
      if (discount > highest) highest = discount;
    }

    return highest;
  }
}