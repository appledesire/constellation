import { screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import Condition from "@components/Main/Condition";
import { ConditionValueHelpers } from "@config/enums";
import { render } from "@utils/testUtils";

describe("<Condition />", () => {
    const defaultTableDataState = [
        {
            "name":"Aachen",
            "id":"1",
            "nametype":"Valid",
            "recclass":"L5",
            "mass":"21",
            "fall":"Fell",
            "year":"1880-01-01T00:00:00.000",
            "reclat":"50.775000",
            "reclong":"6.083330",
            "geolocation":{"type":"Point","coordinates":[6.08333,50.775]}
        }
    ];

    beforeEach(() => {
        jest.setTimeout(30000);
    });

    it("should list all fields in left condition select", async () => {
        const condition = { field: "name", operator: "equal", value: "" };
        
        const { getByRole, getByText } = render(<Condition andIndex={0} orIndex={0} condition={condition} />, {
            initialState: {
                tableData: {
                    data: defaultTableDataState
                }, conditions: {
                    data: [[condition]]
                }
            }
        });

        // eslint-disable-next-line testing-library/prefer-screen-queries
        fireEvent.mouseDown(getByText('name'));
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const listbox = within(getByRole('listbox'));

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const idField = listbox.getByText("id");
        expect(idField).toBeInTheDocument();

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const recclassField = getByText("recclass");
        expect(recclassField).toBeInTheDocument();

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const reclongField = getByText("reclong");
        expect(reclongField).toBeInTheDocument();
    });

    test("should validate value, when invalid number is inputed in GreaterThan operator", async () => {
        const condition = { field: "mass", operator: "greater", value: "4dsg" };

        render(<Condition andIndex={0} orIndex={0} condition={condition} />, {
            initialState: {
                tableData: {
                    data: defaultTableDataState
                }, conditions: {
                    data: [[condition]]
                }
            }
        });
        
        const invalidNumberHelperText = screen.getByText(ConditionValueHelpers.invalidNumber);
        expect(invalidNumberHelperText).toBeInTheDocument();
    });

    test("should validate value, when invalid regex is inputed in Regex operator", async () => {
        const condition = { field: "mass", operator: "regex", value: "/[a/g" };

        render(<Condition andIndex={0} orIndex={0} condition={condition} />, {
            initialState: {
                tableData: {
                    data: defaultTableDataState
                }, conditions: {
                    data: [[condition]]
                }
            }
        });
        
        const invalidNumberHelperText = screen.getByText(ConditionValueHelpers.invalidRegex);
        expect(invalidNumberHelperText).toBeInTheDocument();
    });
});