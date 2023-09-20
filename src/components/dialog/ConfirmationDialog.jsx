import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const ConfirmationDialog = ({ onClose, isOpen, title, children, ...rest }) => {
  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={onClose} open={isOpen} {...rest}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type={"button"} color={"primary"}>
          Cancel
        </Button>
        <Button type={"button"} color={"primary"}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export { ConfirmationDialog };
