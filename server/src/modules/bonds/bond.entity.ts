import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';

export enum CouponFrequency {
  ANNUAL      = 'ANNUAL',
  SEMI_ANNUAL = 'SEMI_ANNUAL',
  QUARTERLY   = 'QUARTERLY',
}

export enum BondType {
  FIXED       = 'FIXED',
  FLOATING    = 'FLOATING',
  ZERO_COUPON = 'ZERO_COUPON',
}

@Entity('bonds')
export class Bond {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  isin: string;

  @Column()
  ticker: string;

  @Column()
  issuer: string;

  @Column({ length: 3 })
  currency: string;

  @Column({ name: 'face_value', type: 'decimal', precision: 20, scale: 4, default: 1000 })
  faceValue: number;

  @Column({ name: 'coupon_rate', type: 'decimal', precision: 8, scale: 6 })
  couponRate: number;

  @Column({ name: 'coupon_frequency', type: 'enum', enum: CouponFrequency })
  couponFrequency: CouponFrequency;

  @Column({ name: 'issue_date', type: 'date' })
  issueDate: string;

  @Column({ name: 'maturity_date', type: 'date' })
  maturityDate: string;

  @Column({ nullable: true })
  rating: string;

  @Column({ length: 3 })
  country: string;

  @Column({ nullable: true })
  sector: string;

  @Column({ type: 'enum', enum: BondType, default: BondType.FIXED })
  type: BondType;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
