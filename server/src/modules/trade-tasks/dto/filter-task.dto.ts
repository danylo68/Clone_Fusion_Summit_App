// filter-task.dto.ts
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskType, TaskStatus, TaskPriority } from '../trade-task.entity';

export class FilterTaskDto {
  @ApiPropertyOptional({ enum: TaskType })
  @IsOptional() @IsEnum(TaskType)
  taskType?: TaskType;

  @ApiPropertyOptional({ enum: TaskStatus })
  @IsOptional() @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority })
  @IsOptional() @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  assignedTo?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ default: 50 })
  @IsOptional()
  limit?: number = 50;
}
