import React from "react";
import Typography from "@material-ui/core/Typography";
import {Button, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {AsyncButton} from "../async-button";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { CardWithIcon } from "../cards";
import { useFormData } from "../../hooks";

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

export const DefaultLoginForm = ({ errors, forgotPasswordLink, signUpLink, onSubmit, }) => {
    const classes = useStyle();
    const [ formData, handleFormChange ] = useFormData({
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
                <LockOpenIcon style={{ fontSize: 60}} color={"primary"}/>
            }
            title={"Login"}
            subtitle={"Using your email and password"}
        >
            <form>
                { errors && (
                    <Typography className={classes.errors} color={"error"}>
                        { errors.map((e, i) => (
                            <div key={i}>
                                { e }
                            </div>
                        )) }
                    </Typography>
                ) }
                <div className={classes.content}>
                    <TextField
                        label="Email Address"
                        fullWidth
                        margin="normal"
                        value={username}
                        name={"username"}
                        onChange={handleFormChange}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        type={"password"}
                        value={password}
                        name={"password"}
                        onChange={handleFormChange}
                        margin="normal"
                    />
                </div>
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