import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography } from "@mui/material";
import React from "react";

export const AccordionSetting = ({
  title,
  subtitle,
  icon = <ArrowForwardIosIcon color="primary" />,
  children,
  ...props
}) => {
  return (
    <Accordion elevation={0} sx={{ mb: 2 }} {...props}>
      <AccordionSummary
        expandIcon={icon}
        sx={{
          cursor: "pointer",
          padding: 0,
          "& .MuiAccordionSummary-content": { alignItems: "center", margin: 0 },
        }}
      >
        <Box py={1} flexGrow={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption" color="textSecondary">
            {subtitle}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};
