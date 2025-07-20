import express from "express";
import offerRoutes from "./routes/offerRoutes";
import discountRoutes from "./routes/discountRoutes";

export const app = express();
app.use(express.json());

app.use("/offer", offerRoutes);
app.use("/highest-discount", discountRoutes);

// 404 handler
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});