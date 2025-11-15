import HelpIcon from "@mui/icons-material/Help";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

import { AsyncButton, CardWithIcon, ResponsiveTextField } from "../../components";
import { makeFormData } from "../../hooks";

const useFormData = makeFormData({
  email: "",
});

export const DefaultForgotPasswordForm = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const { formData, handleFormChange } = useFormData();
  const { email } = formData;
  return (
    <CardWithIcon
      icon={<HelpIcon style={{ fontSize: 60 }} color={"primary"} />}
      title={t("recovery.password.recovery")}
      subtitle={t("recovery.password.recover.password.with.email")}>
      <form onSubmit={() => onSubmit(email)}>
        <Box mb={4} mt={5} pt={5}>
          <ResponsiveTextField
            compact={true}
            label="Email"
            name={"email"}
            value={email}
            onChange={handleFormChange}
            required
          />
        </Box>
        <Box mb={2} mx={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <AsyncButton fullWidth size={"large"} type={"button"} variant={"outlined"} onClick={() => onCancel()}>
                {t("cancel")}
              </AsyncButton>
            </Grid>
            <Grid item xs={6}>
              <AsyncButton fullWidth size={"large"} type={"submit"} onClick={() => onSubmit(email)}>
                {t("recover")}
              </AsyncButton>
            </Grid>
          </Grid>
        </Box>
      </form>
    </CardWithIcon>
  );
};
