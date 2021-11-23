import React from "react"
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));


export const FullScreenDialog = ({ title, isOpen = false, onClose, onSubmit, children, containerSize = "md" }) => {
    const classes = useStyles();
    return (
        <Dialog fullScreen open={isOpen} onClose={onClose}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        { title }
                    </Typography>
                    <Button autoFocus color="inherit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth={containerSize} disableGutters>
                { children }
            </Container>

        </Dialog>
    )
}

FullScreenDialog.propTypes = {
    containerSize: PropTypes.oneOf([
        "xs",
        "sm",
        "md",
        "lg",
        "xl"
    ]),
}