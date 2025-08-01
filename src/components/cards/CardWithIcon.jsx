import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";

import { ResponsiveCard } from "./ResponsiveCard";

export const CardWithIcon = ({ icon, title, subtitle, children, message }) => {
  const theme = useTheme();
  return (
    <ResponsiveCard>
      <div>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} my={1}>
          {icon}
        </Box>
        {message}
        {title && (
          <Typography
            variant={"h5"}
            style={{
              textAlign: "center",
            }}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant={"subtitle2"}
            style={{
              textAlign: "center",
              marginBottom: theme.spacing(3),
            }}
            color={"textSecondary"}>
            {subtitle}
          </Typography>
        )}
        <div>{children}</div>
      </div>
    </ResponsiveCard>
  );
};
