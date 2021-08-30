import React, {useState} from "react";
import {Button, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {AsyncButton} from "../async-button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import {CardWithIcon} from "../cards";
import {useFormData} from "../../hooks";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles(theme => ({
    contentContainer: {
        paddingBottom: theme.spacing(4)
    },
    buttonsContainer: {
        marginBottom: theme.spacing(2)
    },
    linkContainer: {
        display: "flex",
        justifyContent: "space-between",
    }
}))

export const DefaultForgotPasswordForm = ({ errors, onSubmit, onCancel }) => {
    const classes = useStyle();
    const { formData, handleFormChange } = useFormData({
        email: "",
    });
    const {
        email,
    } = formData;
    const handleCancel = () => onCancel();
    const handleSubmit = () => onSubmit({ email })
    return (
        <CardWithIcon
            icon={
                <HelpIcon style={{ fontSize: 60}} color={"primary"}/>
            }
            title={"Password Recovery"}
            subtitle={"Recover your password with email"}
        >
            <form>
                { errors && (
                    <Typography className={classes.errors} color={"error"}>
                        <ul>
                            { errors.map((e, i) => (
                                <li key={i}>
                                    { e }
                                </li>
                            )) }
                        </ul>
                    </Typography>
                ) }
                <div className={classes.contentContainer}>
                    <TextField
                        label="Email Address"
                        fullWidth
                        margin="normal"
                        value={email}
                        name={"email"}
                        type={"email"}
                        onChange={handleFormChange}
                    />
                </div>
                <div className={classes.buttonsContainer}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                size={"large"}
                                type={"cancel"}
                                variant={"outlined"}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <AsyncButton
                                fullWidth
                                size={"large"}
                                type={"submit"}
                                onClick={handleSubmit}
                            >
                                Recover
                            </AsyncButton>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </CardWithIcon>
    )
}