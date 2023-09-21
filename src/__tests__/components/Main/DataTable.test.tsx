import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';

import DataTable from "@components/Main/DataTable";
import { rootReducer } from "@store/index";
import { setTableData } from "@store/slices/tableData.slice";

describe("<DataTable />", () => {
    beforeEach(() => {
        jest.setTimeout(30000);
    });

    jest.setTimeout(30000);

    test("should list all fields in left condition select", async () => {

        const store = configureStore({
            reducer: rootReducer,
            preloadedState: {
                conditions: {
                    data: [
                        [
                            {
                                "field": "recclass",
                                "operator": "contain",
                                "value": "5"
                            },
                            {
                                "field": "fall",
                                "operator": "equal",
                                "value": "Fell"
                            }
                        ],
                        [
                            {
                                "field": "mass",
                                "operator": "greater",
                                "value": 152000
                            }
                        ]
                    ]
                }
            },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware({
                immutableCheck: { warnAfter: 128 },
                serializableCheck: { warnAfter: 128 }
            })
        });
        const response = (await axios.get('https://data.nasa.gov/resource/y77d-th95.json')).data;
        store.dispatch(setTableData(response));
        
        const { getByTestId } = render(
            <Provider store={ store }>
                <DataTable />
            </Provider>
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const filteredCountChip = getByTestId("filtered-count");
        expect(filteredCountChip).toHaveTextContent("Filtered: 30");
    });
});