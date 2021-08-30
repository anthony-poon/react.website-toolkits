import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    container: {
        borderTop: ({borderTop}) => borderTop ? `1px solid ${theme.palette.divider}` : 0,
        borderBottom: ({borderBottom}) => borderBottom ? `1px solid ${theme.palette.divider}` : 0,
        display: "flex",
        alignItems: "center",
    },
    lhs: {
        height: 48,
        width: 48,
        display: "flex",
        alignItems: "center",
    },
    rhs: {
        flexGrow: 1
    }
}));

export const FormFieldWrapper = (props) => {
    const {
        borderBottom = false,
        borderTop = false,
        icon = null,
        leftIndent = false,
        gutter = true,
        children,
        ...rest
    } = props
    const classes = useStyle({
        borderBottom,
        borderTop,
        gutter
    });
    return (
        <Box
            className={classes.container}
            pl={gutter ? 2 : 0}
            pr={gutter ? 2 : 0}
            mt={borderTop ? 3 : 0}
            mb={borderBottom ? 3 : 0}
            {...rest}
        >
            { (leftIndent || icon) && (
                <Box className={classes.lhs}>
                    {icon}
                </Box>
            ) }
            <Box className={classes.rhs}>
                { children }
            </Box>
        </Box>
    )
}