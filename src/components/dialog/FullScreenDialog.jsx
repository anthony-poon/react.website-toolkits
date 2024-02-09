import { useTheme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

export const FullScreenDialog = ({ title, isOpen = false, onClose, onSubmit, children, containerSize = "md" }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <AppBar
        style={{
          position: "relative",
        }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            style={{
              marginLeft: theme.spacing(2),
              flex: 1,
            }}>
            {title}
          </Typography>
          <Button autoFocus color="inherit" onClick={onSubmit}>
            {t("submit")}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth={containerSize} disableGutters>
        {children}
      </Container>
    </Dialog>
  );
};

FullScreenDialog.propTypes = {
  containerSize: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};
