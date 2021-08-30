import React from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(2),
        height: "100%",
    },
    subtitle: {
        // lineHeight: "1rem"
    },
}))

export const DualLineLabel = (props) => {
    const { title = "", subtitle = "", classes: outerClasses = {}, inverted = false, ...rest } = props
    const classes = useStyle();
    return (
        <Box className={classes.container}>
            <Box>
                <Typography
                    className={outerClasses.title}
                    variant={inverted ? "caption" : "body1" }
                    color={inverted ? "textSecondary" : "inherit"}
                    {...rest}
                >
                    { title }
                </Typography>
            </Box>
            <Box>
                <Typography
                    className={`${outerClasses.subtitle}
                    ${classes.subtitle}`}
                    variant={inverted ? "body1" : "caption" }
                    color={inverted ? "inherit" : "textSecondary"}
                >
                    { subtitle }
                </Typography>
            </Box>

        </Box>
    )
}