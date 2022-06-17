import {Box, Grid, Select} from "@material-ui/core";
import React from "react";
import Hidden from "@material-ui/core/Hidden";
import {makeStyles} from "@material-ui/core/styles";
import {FormFieldWrapper} from "./FormFieldWrapper";
import {DualLineLabel} from "./DualLineLabel";

const useStyle = makeStyles(theme => ({
    container: {
        display: "flex",
        width: "100%",
    },
}))

export const ResponsiveSelectField = ({children, label, subLabel, ...rest}) => {
    const classes = useStyle();
    return (
        <FormFieldWrapper
            gutterY={false}
        >
            <div className={classes.container}>
                <Hidden mdUp implementation={"js"}>
                    <Select
                        fullWidth
                        {...rest}
                    >
                        { children }
                    </Select>
                </Hidden>
                <Hidden smDown implementation={"js"}>
                    <Grid container>
                        <Grid item sm={3}>
                            <Box pt={2}>
                                <DualLineLabel
                                    title={label}
                                    subtitle={subLabel}
                                />
                            </Box>
                        </Grid>
                        <Grid item sm={9}>
                            <Box mt={2} mb={1}>
                                <Select
                                    fullWidth
                                    {...rest}
                                >
                                    { children }
                                </Select>
                            </Box>
                        </Grid>
                    </Grid>
                </Hidden>
            </div>
        </FormFieldWrapper>
    )
}