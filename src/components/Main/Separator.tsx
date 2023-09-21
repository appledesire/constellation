import { FC } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        width: '2px',
        height: '30px',
        background: 'rgb(225, 229, 233)',
        margin: '0px auto'
    }
});

const Separator: FC<{}> = () => {
    const classes = useStyles();

    return (
        <Box className={ classes.root }></Box>
    )
}

export default Separator;