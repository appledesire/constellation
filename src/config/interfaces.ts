export interface Condition {
    field: string;
    operator: string;
    value: string | number;
}

export interface ConditionComponentProps {
    andIndex: number;
    orIndex: number;
    condition: Condition | null;
    isLoading: Boolean;
};

export interface DataTableComponentProps {
    isLoading: Boolean;
}

export interface ConditionState {
    data: Condition[][];
}

export interface TableDataState {
    data: Array<any>
}