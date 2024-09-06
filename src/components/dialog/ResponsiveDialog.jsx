import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

export const ResponsiveDialog = ({ isOpen = false, onClose, children, ...rest }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={!fullScreen}
      maxWidth="md"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      {...rest}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
