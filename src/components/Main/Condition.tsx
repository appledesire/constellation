import { Fragment, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Box, FormControl, TextField, InputLabel, Select, MenuItem, IconButton, FormHelperText } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';

import { RootState } from "@store/index";
import { addOrCondition, updateCondition, removeCondition } from "@store/slices/conditions.slice";
import type { ConditionComponentProps } from "@config/interfaces";
import { Operators, ConditionValueHelpers } from "@config/enums";
import { isValidNumber, isValidRegex } from "@utils/index";
import { Typography } from '@mui/material';

const defaultConditionProps: ConditionComponentProps = {
    andIndex: 0,
    orIndex: 0,
    condition: null,
    isLoading: false,
};

const useStyles = makeStyles({
    orText: {
        display: 'flex',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontSize: '20px',
        fontWeight: 700,
        marginLeft: '16px',
        marginRight: '16px'
    }
});

const Condition = ({ andIndex, orIndex, condition, isLoading }: ConditionComponentProps & typeof defaultConditionProps) => {
    const tableData = useSelector((state: RootState) => state.tableData.data);
    const [field, setField] = useState<string>(condition?.field as string);
    const [operator, setOperator] = useState<string>(condition?.operator as string);
    const [value, setValue] = useState<string>(condition?.value as string);
    const [valueHelper, setValueHelper] = useState<string>(ConditionValueHelpers.valid);
    const [isMouseHoverAddButton, setIsMouseHoverAddButton] = useState<boolean>(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChangeLeftCondition = (event: SelectChangeEvent) => {
        setField(event.target.value as string);
    }

    const handleChangeOperator = (event: SelectChangeEvent) => {
        setOperator(event.target.value);
    }

    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleRemoveCondition = () => {
        dispatch(removeCondition({ andIndex: andIndex as number, orIndex: orIndex as number }));
    }

    const handleHoverAddOrCondition = () => {
        setIsMouseHoverAddButton(true);
    }

    const handleOutAddOrCondition = () => {
        setIsMouseHoverAddButton(false);
    }

    const handleAddOrCondition = () => {
        dispatch(addOrCondition({
            andIndex: andIndex as number,
            orIndex: orIndex as number,
        }));
    }

    useEffect(() => {
        let updatedVal: string | number = value;
        setValueHelper(ConditionValueHelpers.valid);
        if (operator === 'greater' || operator === 'less') {
            if (isValidNumber(String(value)))
                updatedVal = Number(value);
            else setValueHelper(ConditionValueHelpers.invalidNumber);
        } else if (operator === 'regex' && !isValidRegex(value as string))
            setValueHelper(ConditionValueHelpers.invalidRegex);

        dispatch(updateCondition({
            andIndex,
            orIndex,
            condition: {
                field,
                operator,
                value: updatedVal
            }
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [field, operator, value]);

    useEffect(() => {
        setField(condition?.field as string);
        setOperator(condition?.operator as string);
        setValue(condition?.value as string);
    }, [condition]);

    return (
        <Fragment>
            <Box sx={{ display: 'flex', gap: '16px', mt: orIndex > 0 ? 3 : 0 }}>
                {
                    orIndex > 0 &&
                        <Typography color='primary' variant="body1" className={ classes.orText }>
                            Or
                        </Typography>
                }
                <FormControl fullWidth>
                    {
                        isLoading ?
                            <Skeleton variant="rectangular" height={56} />
                        :
                            <Fragment>
                                <InputLabel id="left-condition-label">Left Condition</InputLabel>
                                {
                                    tableData.length ?
                                            <Select
                                                label="Left Condition"
                                                labelId="left-condition-label"
                                                value={ field }
                                                onChange={ handleChangeLeftCondition }
                                            >
                                                {
                                                    Object.keys(tableData[0]).map((key: string) =>
                                                        <MenuItem key={ key } value={ key }>{key}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                        : <></>
                                }
                            </Fragment>
                    }
                </FormControl>
                <FormControl fullWidth>
                    {
                        isLoading ?
                            <Skeleton variant="rectangular" height={56} />
                        :
                            <Fragment>
                                <InputLabel id="left-condition-label">Operator</InputLabel>
                                <Select
                                    label="Operator"
                                    labelId="left-condition-label"
                                    value={ operator }
                                    onChange={ handleChangeOperator }
                                >
                                    {
                                        Object.keys(Operators).map((field: string) => (<MenuItem key={ field } value={ field }>{ (Operators as any)[field] }</MenuItem>))
                                    }
                                </Select>
                            </Fragment>
                    }
                </FormControl>
                <FormControl fullWidth>
                    {
                        isLoading ?
                            <Skeleton variant="rectangular" height={56} />
                        :
                        <Fragment>
                            <TextField fullWidth label="Value" variant="outlined" error={ valueHelper !== ConditionValueHelpers.valid }
                                    placeholder="Value" value={ value } onChange={ handleChangeValue } />
                            {
                                valueHelper !== ConditionValueHelpers.valid && <FormHelperText>{ valueHelper }</FormHelperText>
                            }
                        </Fragment>
                        
                    }
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {
                        isLoading ?
                            <Fragment>
                                <Skeleton variant="circular" width={56} height={56} />
                                <Skeleton variant="circular" sx={{ ml: 2 }} width={56} height={56} />
                            </Fragment>
                        :
                            <Fragment>
                                <IconButton color="primary" sx={{ p: '12px' }}
                                            onMouseOver={ handleHoverAddOrCondition }
                                            onMouseOut={ handleOutAddOrCondition }
                                            onClick={ handleAddOrCondition }
                                >
                                    <AddIcon />
                                </IconButton>
                                <IconButton color="warning" sx={{ p: '12px' }}
                                            onClick={ handleRemoveCondition }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Fragment>
                    }
                </Box>
            </Box>

            {
                isMouseHoverAddButton &&
                    <Box sx={{ mt: 3 }}>
                        <Skeleton variant='rectangular' width='100%' height={ 56 } />
                    </Box>
            }
        </Fragment>
    )
}

Condition.defaultProps = defaultConditionProps

export default Condition;