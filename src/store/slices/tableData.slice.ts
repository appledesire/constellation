import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TableDataState } from "@config/interfaces";

const initialState: TableDataState = {
    data: []
};

export const tableDataSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        setTableData: (state, action: PayloadAction<Array<{ [key: string]: string }>>) => {
            state.data = action.payload;
        }
    }
});

export const { setTableData } = tableDataSlice.actions;

export default tableDataSlice.reducer