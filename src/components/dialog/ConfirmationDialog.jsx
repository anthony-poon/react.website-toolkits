import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

const ConfirmationDialog = ({ onClose, isOpen, title, children, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={onClose} open={isOpen} {...rest}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type={"button"} color={"primary"}>
          {t("cancel")}
        </Button>
        <Button type={"button"} color={"primary"}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export { ConfirmationDialog };
