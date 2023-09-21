import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Chip, Skeleton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { RootState } from "@store/index";
import { Condition, DataTableComponentProps } from "@config/interfaces";
import { isValidNumber, isValidRegex } from "@utils/index";

const defaultDataTableProps: DataTableComponentProps = {
    isLoading: false
}

const DataTable = ({ isLoading }: DataTableComponentProps & typeof defaultDataTableProps) => {
    const tableData = useSelector((state: RootState) => state.tableData.data);
    const conditions = useSelector((state: RootState) => state.conditions.data);
    let columns:GridColDef[] = [];
    let filteredTableData: Array<any> = [];

    if (tableData.length) {
        let key;
        for (key of Object.keys(tableData[0])) {
            columns.push({
                field: key,
                headerName: key,
                editable: false
            });
        }

        filteredTableData = tableData.filter((row) => {
            let isTotallyValid:boolean = true;
            let orConditions: Array<Condition>;
            for (orConditions of conditions) {
                let isOrConditionsValid:boolean = false;
                let isAllOrConditionsInvalid:boolean = true;
                let orCondition: Condition;
                for (orCondition of orConditions) {
                    if (orCondition.value === '')
                        continue;

                    switch (orCondition.operator) {
                        case "equal":
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            isOrConditionsValid ||= row[orCondition.field as string] === orCondition.value;

                            break;
                        case "greater":
                            if (!isValidNumber(orCondition.value))
                                continue;

                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            isOrConditionsValid ||= Number(row[orCondition.field as string]) > orCondition.value;

                            break;
                        case "less":
                            if (!isValidNumber(orCondition.value))
                                continue;

                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            isOrConditionsValid ||= Number(row[orCondition.field as string]) < orCondition.value;

                            break;
                        case "contain":
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            isOrConditionsValid ||= row[orCondition.field as string].includes(orCondition.value);

                            break;
                        case "notcontain":
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            isOrConditionsValid ||= !row[orCondition.field as string].includes(orCondition.value);

                            break;
                        case "regex":
                            if (!isValidRegex(orCondition.value as string))
                                continue;

                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            isOrConditionsValid ||= (new RegExp(orCondition.value as string)).test(row[orCondition.field as string]);

                            break;
                    }

                    isAllOrConditionsInvalid = false;
                }

                isTotallyValid &&= isOrConditionsValid || isAllOrConditionsInvalid;
            }

            return isTotallyValid;
        });
    }

    return (
        <Fragment>
            <Box sx={{ mt: 6, mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Result</Typography>
                <Chip label={`Total: ${ isLoading ? "-" : tableData.length }`} />
                <Chip label={`Filtered: ${ isLoading ? "-" : filteredTableData.length }`}
                    color="primary"sx={{ ml: 2 }}
                    data-testid="filtered-count"
                />
            </Box>
            {
                isLoading ?
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ width: '300px', height: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Skeleton variant="rectangular" width='45%' height='100%' />
                            <Skeleton variant="rectangular" width='45%' height='100%' />
                        </Box>
                        {
                            [...Array(6)].map((val, index) =>
                                <Skeleton key={ index } variant="rectangular" width='100%' height='1.2em' sx={{ mt: 2 }} />
                            )
                        }
                    </Box>
                :
                <Box sx={{ width: '100%', height: 400 }}>
                    <DataGrid
                        rows={ filteredTableData }
                        columns={ columns }
                        pageSize={ 100 }
                        rowsPerPageOptions={ [25, 50, 100] }
                    />
                </Box>
            }
        </Fragment>
    )
}

DataTable.defaultProps = defaultDataTableProps;

export default DataTable;