import { Button, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import HelpIcon from "@material-ui/icons/Help";
import React from "react";
import { useTranslation } from "react-i18next";

import { AsyncButton, CardWithIcon } from "../../components";
import { makeFormData } from "../../hooks";

const useStyle = makeStyles((theme) => ({
  contentContainer: {
    paddingBottom: theme.spacing(4),
  },
  buttonsContainer: {
    marginBottom: theme.spacing(2),
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const useFormData = makeFormData({
  email: "",
});

export const DefaultForgotPasswordForm = ({ errors, onSubmit, onCancel }) => {
  const classes = useStyle();
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
          <Typography className={classes.errors} color={"error"}>
            <ul>
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </Typography>
        )}
        <div className={classes.contentContainer}>
          <TextField
            label={t("email.address")}
            fullWidth
            margin="normal"
            value={email}
            name={"email"}
            type={"email"}
            onChange={handleFormChange}
          />
        </div>
        <div className={classes.buttonsContainer}>
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
        </div>
      </form>
    </CardWithIcon>
  );
};
