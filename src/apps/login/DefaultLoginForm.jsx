import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Alert, Box } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { AsyncButton, CardWithIcon, ResponsivePasswordField, ResponsiveTextField } from "../../components";
import { makeFormData } from "../../hooks";
import ENV from "../../../../ENV"


const useFormData = makeFormData({
  username: "",
  password: "",
});

export const DefaultLoginForm = ({ error, forgotPasswordLink, signUpLink, onSubmit }) => {
  const { t } = useTranslation();
  const { formData, handleFormChange } = useFormData();
  const { username, password } = formData;
  const handleSubmit = () => onSubmit({ username, password });
  return (
    <CardWithIcon
      icon={<LockOpenIcon style={{ fontSize: 60 }} color={"primary"} />}
      title={t("login.title")}
      subtitle={t("login.subtitle")}
      message={ENV.IS_DEV && (
        <Alert
          severity="error"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <Typography variant="h6" textAlign={"center"}>Warning: This is a Staging Site</Typography>
          <Typography variant="body1" textAlign={"center"}>Access is restricted.</Typography>
          <Typography variant="body2" textAlign={"center"}>
            This site is not intended for public use and may contain incomplete or sensitive information. Please do not share this link publicly.
          </Typography>
        </Alert>
      )}
    >
      <form>
        {error && (
          <Typography color={"error"} key={error}>
            {error}
          </Typography>
        )}
        <Box mb={2}>
          <ResponsiveTextField
            compact={true}
            gutter={false}
            label={"Email Address"}
            value={username}
            name={"username"}
            type={"email"}
            onChange={handleFormChange}
            subLabel={<Typography variant="body2" sx={{ fontStyle: "italic" }} style={{ fontStyle: "italic" }}>Email is case sensitive</Typography>}
          />
          <ResponsivePasswordField
            compact={true}
            gutter={false}
            label={"Password"}
            value={password}
            name={"password"}
            onChange={handleFormChange}
          />
        </Box>
        <Box mb={2}>
          <AsyncButton
            fullWidth
            size={"large"}
            type={"submit"}
            onClick={handleSubmit}
            style={{ textTransform: "none" }}>
            Login
          </AsyncButton>
        </Box>
      </form>
      <Box display={"flex"} justifyContent={"space-between"}>
        {forgotPasswordLink && (
          <Link component={RouterLink} to={forgotPasswordLink}>
            {t("login.forget")}
          </Link>
        )}
        {signUpLink && (
          <Link component={RouterLink} to={signUpLink}>
            {t("login.create")}
          </Link>
        )}
      </Box>
    </CardWithIcon>
  );
};
