import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import Separator from "@components/Main/Separator";

const AndSeparator: FC<{}> = () => {

    return (
        <Box sx={{ position: 'relative', width: '80px', height: 'auto', flex: '1 1 0%' }}>
            <Separator />
            <Typography variant='h6' sx={{ margin: '0px', letterSpacing: '0.0075em', fontWeight: 700, color: 'gray', textAlign: 'center', textTransform: 'uppercase' }}>And</Typography>
            <Separator />
        </Box>
    )
}

export default AndSeparator;