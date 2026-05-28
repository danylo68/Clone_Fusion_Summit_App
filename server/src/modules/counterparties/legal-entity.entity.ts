import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm';

@Entity('legal_entities')
export class LegalEntity {
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

  @Column({ length: 3, default: 'EUR' })
  currency: string;

  @Column({ nullable: true })
  lei: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
