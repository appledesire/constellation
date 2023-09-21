import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Condition, ConditionState } from "@config/interfaces";

const initialState:ConditionState = {
    data: []
}

let firstCondition: Condition | null = null;

const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

export const conditionsSlice = createSlice({
    name: 'conditions',
    initialState,
    reducers: {
        addFirstCondition: (state, action: PayloadAction<Condition>) => {
            firstCondition = clone(action.payload);
            state.data = [[action.payload]];
        },
        addAndCondition: (state) => {
            state.data.push([clone(firstCondition) as Condition]);
        },
        addOrCondition: (state, action: PayloadAction<{ andIndex: number, orIndex: number}>) => {
            const { andIndex, orIndex } = action.payload;
            const updatedData = state.data;
            updatedData[andIndex].splice(orIndex + 1, 0, clone(firstCondition) as Condition);
            state.data = updatedData;
        },
        updateCondition: (state, action: PayloadAction<{ andIndex: number, orIndex: number, condition: Condition }>) => {
            const { andIndex, orIndex, condition } = action.payload;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            (state.data as any)[andIndex][orIndex] = condition;
        },
        removeCondition: (state, action: PayloadAction<{ andIndex: number, orIndex: number }>) => {
            const { andIndex, orIndex } = action.payload;
            const updatedData = state.data;
            updatedData[andIndex].splice(orIndex, 1);
            if (!updatedData[andIndex].length)
                updatedData.splice(andIndex, 1);
            state.data = updatedData;
        }
    }
});

export const { addFirstCondition, addAndCondition, addOrCondition, updateCondition, removeCondition } = conditionsSlice.actions;

export default conditionsSlice.reducer;