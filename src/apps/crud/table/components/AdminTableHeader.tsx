import React from "react";
import { Box } from "@mui/material";
import { FormTitle } from "../../../../components/form/FormTitle";

interface AdminTableHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const AdminTableHeader = ({ title, subtitle, children }: AdminTableHeaderProps) => (
  <Box sx={{ display: "flex", alignItems: "flex-end", whiteSpace: "nowrap" }} mb={1}>
    {/* 280px matches the longest superadmin title width */}
    <Box sx={{ width: 280, flexShrink: 0 }}>
      <FormTitle title={title} subtitle={subtitle} />
    </Box>
    {children && (
      <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1, flexGrow: 1 }}>
        {children}
      </Box>
    )}
  </Box>
);
