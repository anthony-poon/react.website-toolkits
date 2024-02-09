import { Box, useTheme } from "@material-ui/core";
import React from "react";

export const FormFieldWrapper = (props) => {
  const {
    borderBottom = false,
    borderTop = false,
    icon = null,
    leftIndent = false,
    gutter = true,
    children,
    ...rest
  } = props;
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      borderTop={borderTop ? `1px solid ${theme.palette.divider}` : 0}
      borderBottom={borderBottom ? `1px solid ${theme.palette.divider}` : 0}
      pl={gutter ? 2 : 0}
      pr={gutter ? 2 : 0}
      mt={borderTop ? 3 : 0}
      mb={borderBottom ? 3 : 0}
      {...rest}>
      {(leftIndent || icon) && (
        <Box height={48} width={48} display={"flex"} alignItems={"center"}>
          {icon}
        </Box>
      )}
      <Box flexGrow={1}>{children}</Box>
    </Box>
  );
};
