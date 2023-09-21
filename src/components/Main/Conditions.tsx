import { FC, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import Condition from "@components/Main/Condition";
import AndSeparator from "@components/Main/AndSeparator";
import Separator from "@components/Main/Separator";
import { RootState } from "@store/index";
import { addAndCondition } from "@store/slices/conditions.slice";
import { Condition as ConditionType } from "@config/interfaces";

const Conditions: FC<{}> = () => {
    const conditions = useSelector((state: RootState) => state.conditions.data);
    const dispatch = useDispatch();

    const handleAddAndCondition = () => {
        dispatch(addAndCondition());
    }

    return (
        <Fragment>
            {
                conditions.map((andCondition: Array<ConditionType>, i: number) =>
                    <Fragment key={ `and ${ Number(i) }` }>
                        <Paper sx={{ p: 3 }}>
                        {
                            andCondition.map((orCondition: ConditionType, j: number) =>
                                <Condition
                                    key={ `or ${ Number(j) }` }
                                    andIndex={ i }
                                    orIndex={ j }
                                    condition={ orCondition }
                                />
                            )
                        }
                        </Paper>
                        {
                            i < conditions.length - 1 && <AndSeparator />
                        }
                    </Fragment>
                )
            }
            {
                conditions.length > 0 &&
                    <Box sx={{ position: 'relative', width: '80px', height: 'auto' }}>
                        <Separator />
                        <Button variant="outlined"
                                startIcon={ <AddIcon /> }
                                sx={{ display: 'flex', alignItems: 'center', transform: 'uppercase' }}
                                onClick={ handleAddAndCondition }
                        >
                            And
                        </Button>
                    </Box>
            }
        </Fragment>
    )
}

export default Conditions;