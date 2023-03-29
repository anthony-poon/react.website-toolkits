import {TextField, Grid} from "@material-ui/core";
import React from "react";
import Hidden from "@material-ui/core/Hidden";
import {makeStyles} from "@material-ui/core/styles";
import {DualLineLabel} from "./DualLineLabel";
import {FormFieldWrapper} from "./FormFieldWrapper";
import Box from "@material-ui/core/Box";
import Checkbox from '@material-ui/core/Checkbox';

const useStyle = makeStyles(theme => ({
    container: {
        display: "flex",
    },
    label: {
        height: "100%",
        display: "flex",
        alignItems: "center",
    }
}))

export const ResponsiveTextField = ({ error, label, subLabel, value, hasNA, naValue = "N/A", name, onChange, ref, ...rest }) => {
    const classes = useStyle();
    const isError = Boolean(error);
    const isNA = hasNA && value === naValue;
    const handeNAChecked = () => {
        if (isNA) {
            onChange(name, "");
        } else {
            onChange(name, naValue);
        }
    }
    const handleChange = evt => {
        onChange(name, evt.target.value)
    };
    return (
        <FormFieldWrapper>
            <div className={classes.container}>
                <Hidden mdUp implementation={"js"}>
                    <Grid container>
                        { hasNA && (
                            <Grid item xs={4}>
                                <Box display={"flex"} alignItems={"center"} style={{ height: "100%"}} pt={2}>
                                    <Checkbox
                                        checked={isNA}
                                        onChange={handeNAChecked}
                                    />
                                    <Box flex={1}>N/A</Box>
                                </Box>
                            </Grid>
                        ) }
                        <Grid item xs>
                            <TextField
                                fullWidth
                                error={isError}
                                helperText={isError ? error : subLabel}
                                label={label}
                                value={value === undefined || value === null  ? value : ""}
                                margin={"normal"}
                                name={name}
                                disabled={isNA}
                                onChange={handleChange}
                                {...rest}
                            />
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smDown implementation={"js"} >
                    <Grid container>
                        <Grid item xs={3}>
                            <Box pr={2} pt={2}>
                                <DualLineLabel
                                    title={label}
                                    subtitle={subLabel}
                                />
                            </Box>
                        </Grid>
                        { hasNA && (
                            <Grid item xs={2}>
                                <Box display={"flex"} alignItems={"center"} style={{ height: "100%"}} pt={2} mr={2}>
                                    <Checkbox
                                        checked={isNA}
                                        onChange={handeNAChecked}
                                    />
                                    <Box flex={1}>N/A</Box>
                                </Box>
                            </Grid>
                        ) }
                        <Grid item xs>
                            <TextField
                                error={isError}
                                fullWidth
                                margin={"normal"}
                                value={value ? value : ""}
                                helperText={error}
                                name={name}
                                disabled={isNA}
                                onChange={handleChange}
                                {...rest}
                            />
                        </Grid>
                    </Grid>
                </Hidden>
            </div>
        </FormFieldWrapper>
    )
}