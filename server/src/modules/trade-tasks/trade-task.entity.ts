import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { Trade } from '../trades/trade.entity';

export enum TaskType {
  CONFIRMATION = 'CONFIRMATION',
  SETTLEMENT   = 'SETTLEMENT',
  VALUATION    = 'VALUATION',
  MARGIN_CALL  = 'MARGIN_CALL',
  ACCOUNTING   = 'ACCOUNTING',
  REPORTING    = 'REPORTING',
}

export enum TaskStatus {
  PENDING     = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED   = 'COMPLETED',
  FAILED      = 'FAILED',
  OVERDUE     = 'OVERDUE',
}

export enum TaskPriority {
  LOW      = 'LOW',
  NORMAL   = 'NORMAL',
  HIGH     = 'HIGH',
  CRITICAL = 'CRITICAL',
}

@Entity('trade_tasks')
export class TradeTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Trade, { eager: true })
  @JoinColumn({ name: 'trade_id' })
  trade: Trade;

  @Column({ name: 'task_type', type: 'enum', enum: TaskType })
  taskType: TaskType;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.NORMAL })
  priority: TaskPriority;

  @Column({ name: 'assigned_to', nullable: true })
  assignedTo: string;

  @Column({ name: 'due_date', type: 'timestamptz', nullable: true })
  dueDate: Date;

  @Column({ name: 'completed_at', type: 'timestamptz', nullable: true })
  completedAt: Date;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
