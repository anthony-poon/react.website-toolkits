import { Box } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { AsyncButton, CardWithIcon, FormContent, FormFieldWrapper } from "../../components";
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
        <FormContent>
          <FormFieldWrapper>
            <TextField
              label="Email Address"
              fullWidth
              margin="normal"
              value={username}
              name={"username"}
              type={"email"}
              onChange={handleFormChange}
            />
          </FormFieldWrapper>
          <FormFieldWrapper>
            <TextField
              label="Password"
              fullWidth
              type={"password"}
              value={password}
              name={"password"}
              onChange={handleFormChange}
              margin="normal"
            />
          </FormFieldWrapper>
        </FormContent>
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
