import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { SuperAdminEditAnswerApp } from '../../../../../view/s-admin/answers/SuperAdminEditAnswerApp';

export default function ResponsiveDialog({ title, isOpen = false, onClose, onSubmit, children }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={!fullScreen}
                maxWidth="md"
                open={isOpen}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
