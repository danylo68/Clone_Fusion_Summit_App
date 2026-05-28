import { TradeTasksService } from './trade-tasks.service';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TradeTasksController {
    private readonly service;
    constructor(service: TradeTasksService);
    getDashboard(): Promise<{
        byType: any[];
        overdue: number;
        pending: number;
        critical: number;
    }>;
    findAll(filter: FilterTaskDto): Promise<{
        items: import("./trade-task.entity").TradeTask[];
        total: number;
        page: number;
        limit: number;
    }>;
    updateStatus(id: string, dto: UpdateTaskDto): Promise<import("./trade-task.entity").TradeTask>;
}
