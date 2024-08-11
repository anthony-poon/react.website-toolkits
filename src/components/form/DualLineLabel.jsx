import { Box, Typography } from "@mui/material";
import React from "react";

export const DualLineLabel = (props) => {
  const { required, title = "", subtitle = "", inverted = false, textAlign = "left", ...rest } = props;
  return (
    <Box
      style={{
        height: "100%",
      }}>
      <Box textAlign={textAlign}>
        <Box display={"flex"}>
          <Typography variant={inverted ? "caption" : "body1"} color={inverted ? "textSecondary" : "inherit"} {...rest}>
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
        <Typography variant={inverted ? "body1" : "caption"} color={inverted ? "inherit" : "textSecondary"}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};
