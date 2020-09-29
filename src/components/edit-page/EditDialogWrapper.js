import { Box, CircularProgress, Dialog, DialogTitle, useTheme } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const EditDialogWrapper = ({children, loading, handleClose, open, title}) => {
    const theme = useTheme();

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle><FormattedMessage id={title}/></DialogTitle>
            <Box display='flex' alignItems='center' flexDirection='column'>
                {children}
            </Box>
            {
                loading &&
                <Box
                    display='flex'
                    position='absolute'
                    height='100%'
                    width='100%'
                    justifyContent='center'
                    alignItems='center'
                    bgcolor={theme.palette.background.paper}
                    zIndex='1'
                    style={{opacity: 0.3}}
                >
                    <CircularProgress/>
                </Box>
            }
        </Dialog>
    );
}
 
export default EditDialogWrapper;