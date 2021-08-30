import React from "react";
import {Box, MenuItem} from "@material-ui/core";
import {DualLineLabel} from "./DualLineLabel";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles} from "@material-ui/core/styles";
import {FormFieldWrapper} from "./FormFieldWrapper";
import {Link as RouterLink} from "react-router-dom";

const useStyle = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
    }
}))

export const RedirectField = ({ borderBottom = false, borderTop = false, title, subtitle, to = "#"}) => {
    const classes = useStyle();
    return (
        <Box my={3}>
            <FormFieldWrapper
                gutter={false}
                borderBottom={borderBottom}
                borderTop={borderTop}
            >
                <Box py={2}>
                    <MenuItem className={classes.container} component={RouterLink} to={to}>
                        <DualLineLabel
                            title={title}
                            subtitle={subtitle}
                        />
                        <ArrowForwardIosIcon color={"primary"}/>
                    </MenuItem>
                </Box>

            </FormFieldWrapper>
        </Box>

    )
}