import { configureStore, combineReducers } from '@reduxjs/toolkit';

import tableDataReducer from "@store/slices/tableData.slice";
import conditionsReducer from "@store/slices/conditions.slice";

export const rootReducer = combineReducers({
    tableData: tableDataReducer,
    conditions: conditionsReducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;