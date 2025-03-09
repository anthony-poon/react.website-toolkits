import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

const ConfirmationDialog = ({ onClose, isOpen, title, children, onCancel, onConfirm, hasCancel = true, ...rest }) => {
  const { t } = useTranslation();
  const handleCancel = () => {
    onCancel && onCancel();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm && onConfirm();
    onClose();
  };
  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={onClose} open={isOpen} {...rest}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {hasCancel && (
          <Button type={"button"} color={"primary"} onClick={handleCancel}>
            {t("cancel")}
          </Button>
        )}
        <Button type={"button"} color={"primary"} onClick={handleConfirm}>
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
