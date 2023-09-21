import React, { FC, Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, FormControl, TextField, FormHelperText, Paper } from '@mui/material';
import axios from 'axios';

import Conditions from "@components/Main/Conditions";
import Condition from "@components/Main/Condition";
import DataTable from "@components/Main/DataTable";
import { setTableData } from "@store/slices/tableData.slice";
import { addFirstCondition } from "@store/slices/conditions.slice";
import { UrlHelper, Operators } from "@config/enums";

const Main: FC<{}> = () => {
    const [url, setUrl] = useState<string>('https://data.nasa.gov/resource/y77d-th95.json');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    }

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        axios.get(url)
            .then(response => response.data)
            .then(response => {
                if (!Array.isArray(response)) {
                    setIsLoading(true);
                    setIsError(false);
                } else {
                    dispatch(setTableData(response));
                    dispatch(addFirstCondition({
                        // eslint-disable-next-line no-mixed-operators
                        field: response.length && Object.keys(response[0])[0] || '',
                        operator: Object.keys(Operators)[0],
                        value: ''
                    }));
                    setIsLoading(false);
                    setIsError(false);
                }
            })
            .catch(() => {
                setIsLoading(true);
                setIsError(true);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>Condition Builder</Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField fullWidth label="Url" variant="outlined" error={ isError } value={ url }
                            placeholder="Url" onChange={ handleUrlChange } />
                <FormHelperText error={ isError }>{ isError ? UrlHelper.fail : UrlHelper.success }</FormHelperText>
            </FormControl>

            {
                isLoading
                    ?
                        <Fragment>
                            <Paper sx={{ p: 3 }}>
                                <Condition isLoading={true} />
                            </Paper>
                            <DataTable isLoading={true} />
                        </Fragment>
                    :
                        <Fragment>
                            <Conditions />
                            <DataTable />
                        </Fragment>
            }
        </Container>
    )
}

export default Main;