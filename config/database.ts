import { DataSource } from "typeorm";
import { Offer } from "../models/Offer";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Offer],
});