import HelpIcon from "@mui/icons-material/Help";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

import { AsyncButton, CardWithIcon } from "../../components";
import { makeFormData } from "../../hooks";

const useFormData = makeFormData({
  email: "",
});

export const DefaultForgotPasswordForm = ({ errors, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const { formData, handleFormChange } = useFormData({
    email: "",
  });
  const { email } = formData;
  const handleCancel = () => onCancel();
  const handleSubmit = () => onSubmit(email);
  return (
    <CardWithIcon
      icon={<HelpIcon style={{ fontSize: 60 }} color={"primary"} />}
      title={t("recovery.password.recovery")}
      subtitle={t("recovery.password.recover.password.with.email")}>
      <form onSubmit={handleSubmit}>
        {errors && (
          <Typography color={"error"}>
            <ul>
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </Typography>
        )}
        <Box mb={4}>
          <TextField
            label={t("email.address")}
            fullWidth
            margin="normal"
            value={email}
            name={"email"}
            type={"email"}
            onChange={handleFormChange}
          />
        </Box>
        <Box mb={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button fullWidth size={"large"} type={"button"} variant={"outlined"} onClick={handleCancel}>
                {t("cancel")}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <AsyncButton fullWidth size={"large"} type={"submit"} onClick={handleSubmit}>
                {t("recover")}
              </AsyncButton>
            </Grid>
          </Grid>
        </Box>
      </form>
    </CardWithIcon>
  );
};
