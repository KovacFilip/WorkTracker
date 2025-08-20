export type WorkLogBase = {
    start: Date;
    end?: Date;
    description?: string;
};

export type WorkLogEntity = WorkLogBase & {
    id: string;
};

export type CreateWorkLog = {
    start: Date;
    end?: Date;
    description?: string;
};

export type UpdateWorkLog = Partial<WorkLogBase>;

export type WorkLogEntityComplex = WorkLogEntity & {
    minutes?: number;
};

export type WorkLogId = string;
