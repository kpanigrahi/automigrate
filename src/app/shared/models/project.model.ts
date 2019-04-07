import { Item } from './item.model';

export interface Project {
    id: number;
    details: {
        name: string;
        desc: string;
        items: Item[];
        modifiedBy: number;
        modifiedOn: Date;
    };
}