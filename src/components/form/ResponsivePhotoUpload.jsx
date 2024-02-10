import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

export const ResponsivePhotoUpload = ({ src, label, subLabel, onUpload, disabled }) => {
  const fileRef = useRef();
  const { t } = useTranslation();
  const handleClick = () => {
    fileRef.current.click();
  };
  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (!file) {
      return;
    }
    onUpload(file);
  };
  return (
    <FormFieldWrapper>
      <input
        type={"file"}
        style={{
          display: "none",
        }}
        ref={fileRef}
        onChange={handleFileChange}
      />
      <Box display={"flex"}>
        <Grid container>
          <Grid item sm={3}>
            <Box pr={2} pt={2}>
              <DualLineLabel title={label} subtitle={subLabel} />
            </Box>
          </Grid>
          {src ? (
            <Grid item>
              <Box pt={2}>
                <img
                  src={src}
                  alt={"upload"}
                  style={{
                    maxWidth: 300,
                    maxHeight: 300,
                  }}
                />
              </Box>
            </Grid>
          ) : (
            <Grid item>
              <Box pt={2}>
                <Button disabled={disabled} color={"primary"} variant={"contained"} onClick={handleClick}>
                  {t("upload")}
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </FormFieldWrapper>
  );
};
