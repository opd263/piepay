import { Request, Response } from "express";
import { DiscountService } from "../services/discountService";

export const getHighestDiscount = async (req: Request, res: Response) => {
  try {
    const amount = parseFloat(req.query.amountToPay as string);
    const bankName = req.query.bankName as string;
    const paymentInstrument = req.query.paymentInstrument as string | undefined;

    const highestDiscount = await DiscountService.calculateHighestDiscount(
      amount,
      bankName,
      paymentInstrument
    );
    res.json({ highestDiscountAmount: highestDiscount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};