import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  offerId!: string;               // uses adjustment_id

  @Column()
  adjustmentType!: string;

  @Column()
  summary!: string;

  @Column("simple-array", { nullable: true })
  paymentInstruments!: string[];  // contributors.payment_instrument

  @Column("simple-array", { nullable: true })
  banks!: string[];               // contributors.banks

  @Column("simple-array", { nullable: true })
  emiMonths!: string[];           // contributors.emi_months

  @Column("simple-array", { nullable: true })
  cardNetworks!: string[];        // contributors.card_networks

  @Column({ nullable: true })
  imageUrl!: string;
}