import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
