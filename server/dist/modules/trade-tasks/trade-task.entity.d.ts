import { Trade } from '../trades/trade.entity';
export declare enum TaskType {
    CONFIRMATION = "CONFIRMATION",
    SETTLEMENT = "SETTLEMENT",
    VALUATION = "VALUATION",
    MARGIN_CALL = "MARGIN_CALL",
    ACCOUNTING = "ACCOUNTING",
    REPORTING = "REPORTING"
}
export declare enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    OVERDUE = "OVERDUE"
}
export declare enum TaskPriority {
    LOW = "LOW",
    NORMAL = "NORMAL",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
export declare class TradeTask {
    id: string;
    trade: Trade;
    taskType: TaskType;
    status: TaskStatus;
    priority: TaskPriority;
    assignedTo: string;
    dueDate: Date;
    completedAt: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
