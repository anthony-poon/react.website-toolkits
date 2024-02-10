import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import {
  AsyncButton,
  CardWithIcon,
  FormContent,
  FormFieldWrapper,
  ResponsivePasswordField,
  ResponsiveTextField,
} from "../../components";
import { makeFormData } from "../../hooks";

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
      subtitle={t("login.subtitle")}>
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
