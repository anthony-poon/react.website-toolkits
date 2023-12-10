import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyle = makeStyles(() => ({
  container: {
    height: "100%",
  },
  subtitle: {
    // lineHeight: "1rem"
  },
}));

export const DualLineLabel = (props) => {
  const {
    required,
    title = "",
    subtitle = "",
    classes: outerClasses = {},
    inverted = false,
    textAlign = "left",
    ...rest
  } = props;
  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Box textAlign={textAlign}>
        <Box display={"flex"}>
          <Typography
            className={outerClasses.title}
            variant={inverted ? "caption" : "body1"}
            color={inverted ? "textSecondary" : "inherit"}
            {...rest}>
            {title}
          </Typography>
          {required && (
            <Box ml={1} color={"red"}>
              <span>*</span>
            </Box>
          )}
        </Box>
      </Box>
      <Box textAlign={textAlign}>
        <Typography
          className={`${outerClasses.subtitle}
                    ${classes.subtitle}`}
          variant={inverted ? "body1" : "caption"}
          color={inverted ? "inherit" : "textSecondary"}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};
