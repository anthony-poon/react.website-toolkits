import {TextField, Grid} from "@material-ui/core";
import React from "react";
import Hidden from "@material-ui/core/Hidden";
import {makeStyles} from "@material-ui/core/styles";
import {DualLineLabel} from "./DualLineLabel";
import {FormFieldWrapper} from "./FormFieldWrapper";
import Box from "@material-ui/core/Box";

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

export const ResponsiveDatePicker = ({ error, label, subLabel, value, name, onChange, ...rest }) => {
    const classes = useStyle();
    const isError = Boolean(error);
    const handleChange = evt => onChange(name, evt.target.value);
    return (
        <FormFieldWrapper>
            <div className={classes.container}>
                <Hidden mdUp implementation={"js"}>
                    <TextField
                        error={isError}
                        helperText={isError ? error : subLabel}
                        value={value ? value : ""}
                        margin={"normal"}
                        {...rest}
                        onChange={handleChange}
                    />
                </Hidden>
                <Hidden smDown implementation={"js"} >
                        <Grid container>
                            <Grid item sm={3}>
                                <Box pr={2} pt={2}>
                                    <DualLineLabel
                                        title={label}
                                        subtitle={subLabel}
                                    />
                                </Box>
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    error={isError}
                                    helperText={isError ? error : subLabel}
                                    type={"date"}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={value ? value : ""}
                                    margin={"normal"}
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