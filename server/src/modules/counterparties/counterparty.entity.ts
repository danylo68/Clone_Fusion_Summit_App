import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

export enum CounterpartyType {
  BANK         = 'BANK',
  CORPORATE    = 'CORPORATE',
  HEDGE_FUND   = 'HEDGE_FUND',
  PENSION_FUND = 'PENSION_FUND',
}

@Entity('counterparties')
export class Counterparty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  reference: string;

  @Column({ default: 'BBG' })
  referential: string;

  @Column()
  name: string;

  @Column({ length: 3 })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'enum', enum: CounterpartyType })
  type: CounterpartyType;

  @Column({ name: 'credit_rating', nullable: true })
  creditRating: string;

  @Column({ nullable: true })
  lei: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
