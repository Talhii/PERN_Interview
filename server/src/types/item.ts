export interface Item {
    id: number;
    name: string;
    description: string;
    created_at?: Date;
}

export interface CreateItemDTO {
    name: string;
    description: string;
}

export interface UpdateItemDTO extends CreateItemDTO {
    id: number;
}
