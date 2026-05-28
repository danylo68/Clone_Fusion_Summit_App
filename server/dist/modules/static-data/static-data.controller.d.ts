import { StaticDataService } from './static-data.service';
export declare class StaticDataController {
    private readonly service;
    constructor(service: StaticDataService);
    getTradeTypes(): {
        items: {
            code: string;
            name: string;
            description: string;
        }[];
    };
    getTradeStatuses(): {
        items: {
            code: string;
            name: string;
            description: string;
        }[];
    };
    getTaskTypes(): {
        items: {
            code: string;
            name: string;
            description: string;
        }[];
    };
    getDesks(): {
        items: {
            code: string;
            name: string;
        }[];
    };
}
