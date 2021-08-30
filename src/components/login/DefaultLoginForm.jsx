import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {AsyncButton} from "../async-button";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import {CardWithIcon} from "../cards";
import {useFormData} from "../../hooks";
import {FormContent, FormFieldWrapper} from "../form";

const useStyle = makeStyles(theme => ({
    errors: {
    },
    content: {
        paddingBottom: theme.spacing(4)
    },
    buttons: {
        marginBottom: theme.spacing(2)
    },
    links: {
        display: "flex",
        justifyContent: "space-between",
    }
}))

export const DefaultLoginForm = ({ error, forgotPasswordLink, signUpLink, onSubmit }) => {
    const classes = useStyle();
    const { formData, handleFormChange } = useFormData({
        username: "",
        password: "",
    });
    const {
        username,
        password
    } = formData;
    const handleSubmit = () => onSubmit({ username, password });
    return (
        <CardWithIcon
            icon={
                <LockOpenIcon style={{ fontSize: 60 }} color={"primary"}/>
            }
            title={"Login"}
            subtitle={"Using your email and password"}
        >
            <form>
                { error && (
                    <Typography className={classes.errors} color={"error"} key={error}>
                        { error }
                    </Typography>
                )}
                <FormContent>
                    <FormFieldWrapper>
                        <TextField
                            label="Email Address"
                            fullWidth
                            margin="normal"
                            value={username}
                            name={"username"}
                            type={"email"}
                            onChange={handleFormChange}
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper>
                        <TextField
                            label="Password"
                            fullWidth
                            type={"password"}
                            value={password}
                            name={"password"}
                            onChange={handleFormChange}
                            margin="normal"
                        />
                    </FormFieldWrapper>

                </FormContent>
                <div className={classes.buttons}>
                    <AsyncButton
                        fullWidth
                        size={"large"}
                        type={"submit"}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </AsyncButton>
                </div>
            </form>
            <div className={classes.links}>
                {
                    forgotPasswordLink && (
                        <Link component={RouterLink} to={forgotPasswordLink}>
                            Forgot password?
                        </Link>
                    )
                }
                {
                    signUpLink && (
                        <Link component={RouterLink} to={signUpLink}>
                            Sign Up
                        </Link>
                    )
                }
            </div>
        </CardWithIcon>
    )
}