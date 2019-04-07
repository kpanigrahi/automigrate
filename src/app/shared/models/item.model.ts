import { Project } from './project.model';

export interface Item {
    id: number;
    details: {
        type: number;
        name: string;
        desc?: string;
        modules: number[];
        url?: string;
        modifiedBy: number;
        modifiedOn: Date;
    };
    dependencies?: {
        id: number;
        type: number;
        name: string;
    }[];
    references?: {
        projects?: Project[];
    };
}