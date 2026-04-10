import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { AsyncButton } from "../../components";
import { makeFormData } from "../../hooks";
import { ISTO_PRIMARY, ISTO_DARK } from "./colors";

const useFormData = makeFormData({
  username: "",
  password: "",
});

/**
 * CandidateLoginForm — the redesigned left-column form used by the ISTO
 * candidate portal inside SplitLoginLayout. Reuses shared toolkit primitives
 * (ResponsiveTextField, ResponsivePasswordField, AsyncButton) so field
 * behavior stays consistent with the rest of the app. Does NOT replace
 * DefaultLoginForm — the exam repo continues to use that component unchanged.
 *
 * All user-facing copy is driven by i18n keys passed via props.
 */
export const CandidateLoginForm = ({
  error,
  forgotPasswordLink,
  signUpLink,
  onSubmit,
  message,
  recaptcha,
  badge,
  titleKey = "login.candidateTitle",
  subtitleKey = "login.subtitle",
}) => {
  const { t } = useTranslation();
  const { formData, handleFormChange } = useFormData();
  const { username, password } = formData;
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (evt) => handleFormChange(evt.target.name, evt.target.value);

  useEffect(() => {
    if (!recaptcha) {
      return;
    }
    // eslint-disable-next-line no-undef
    grecaptcha.render(document.getElementById("recaptcha"), {
      sitekey: recaptcha,
    });
  }, [recaptcha]);

  const handleSubmit = () => onSubmit({ username, password });

  return (
    <Box sx={styles.wrap}>
      {message && <Box sx={styles.messageSlot}>{message}</Box>}
      {badge && (
        <Box sx={styles.badge}>
          <LockOutlinedIcon sx={{ fontSize: 12 }} />
          <span>{t(badge.labelKey)}</span>
        </Box>
      )}
      <Typography component="h1" sx={styles.title}>
        {t(titleKey)}
      </Typography>
      <Typography component="p" sx={styles.subtitle}>
        {t(subtitleKey)}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 1, fontSize: 13 }}>
          {error}
        </Typography>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <Box sx={styles.fieldBlock}>
          <Box sx={styles.fieldLabelRow}>
            <Box component="label" htmlFor="login-email" sx={styles.fieldLabel}>
              {t("email.address")}
            </Box>
          </Box>
          <TextField
            id="login-email"
            fullWidth
            variant="outlined"
            size="small"
            name="username"
            type="email"
            placeholder="e.g. name@example.com"
            value={username}
            onChange={handleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: "#9AA0A6" }} />
                </InputAdornment>
              ),
              sx: styles.inputBox,
            }}
          />
        </Box>

        <Box sx={styles.fieldBlock}>
          <Box sx={styles.fieldLabelRow}>
            <Box component="label" htmlFor="login-password" sx={styles.fieldLabel}>
              {t("password")}
            </Box>
            {forgotPasswordLink && (
              <Link
                component={RouterLink}
                to={forgotPasswordLink}
                sx={styles.forgotLink}
              >
                {t("login.forget")}
              </Link>
            )}
          </Box>
          <TextField
            id="login-password"
            fullWidth
            variant="outlined"
            size="small"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            value={password}
            onChange={handleInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ fontSize: 18, color: "#9AA0A6" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    size="small"
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ fontSize: 18 }} />
                    ) : (
                      <Visibility sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              sx: styles.inputBox,
            }}
          />
        </Box>

        <Box id="recaptcha" sx={styles.recaptcha} />

        <Box sx={{ mt: 2 }}>
          <AsyncButton
            fullWidth
            size="large"
            type="submit"
            style={{ textTransform: "none" }}
          >
            {t("login.title")}
          </AsyncButton>
        </Box>
      </form>

      {signUpLink && (
        <Box sx={styles.divider}>
          <Typography component="h3" sx={styles.dividerHeading}>
            {t("login.newToIsto")}
          </Typography>
          <Typography component="p" sx={styles.dividerBody}>
            {t("login.newToIsto.body")}
          </Typography>
          <Button
            component={RouterLink}
            to={signUpLink}
            variant="outlined"
            fullWidth
            sx={styles.createButton}
          >
            {t("login.create")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

const styles = {
  wrap: {
    width: "100%",
  },
  messageSlot: {
    mb: 2.5,
  },
  fieldBlock: {
    mb: 2,
  },
  fieldLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 0.75,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: "#1A1A1A",
  },
  inputBox: {
    borderRadius: "2px",
    fontSize: 13,
    bgcolor: "#fff",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E5E7EB",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C8CBD0",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: ISTO_PRIMARY,
      borderWidth: "1px",
      boxShadow: "0 0 0 2px rgba(0,119,59,0.08)",
    },
    "& input": {
      py: "10px",
      fontSize: 13,
    },
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
    bgcolor: "#E8F5EE",
    color: ISTO_PRIMARY,
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    px: "12px",
    py: "5px",
    borderRadius: "2px",
    mb: 2.5,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    m: 0,
    mb: 0.5,
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 13,
    color: "#5F6368",
    m: 0,
    mb: 2.5,
  },
  recaptcha: {
    mt: 2,
    display: "flex",
    justifyContent: "center",
  },
  forgotLink: {
    fontSize: 12,
    color: ISTO_PRIMARY,
    fontWeight: 600,
    "&:hover": { color: ISTO_DARK },
  },
  divider: {
    mt: 3,
    pt: 2.5,
    borderTop: "1px solid #F0F1F3",
  },
  dividerHeading: {
    fontSize: 13,
    fontWeight: 600,
    m: 0,
    mb: 0.75,
    color: "#1A1A1A",
  },
  dividerBody: {
    fontSize: 12,
    color: "#5F6368",
    m: 0,
    mb: 1.5,
    lineHeight: 1.55,
  },
  createButton: {
    textTransform: "none",
    borderColor: ISTO_PRIMARY,
    color: ISTO_PRIMARY,
    borderRadius: "2px",
    fontWeight: 600,
    fontSize: 13,
    "&:hover": {
      borderColor: ISTO_PRIMARY,
      bgcolor: "#E8F5EE",
    },
  },
};
