import { Repository } from 'typeorm';
import { TradeTask } from './trade-task.entity';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TradeTasksService {
    private readonly repo;
    constructor(repo: Repository<TradeTask>);
    findAll(filter: FilterTaskDto): Promise<{
        items: TradeTask[];
        total: number;
        page: number;
        limit: number;
    }>;
    getDashboard(): Promise<{
        byType: any[];
        overdue: number;
        pending: number;
        critical: number;
    }>;
    updateStatus(id: string, dto: UpdateTaskDto): Promise<TradeTask>;
}
