import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef } from "react";

import { DualLineLabel } from "./DualLineLabel";
import { FormFieldWrapper } from "./FormFieldWrapper";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  label: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  image: {
    maxWidth: 300,
    maxHeight: 300,
  },
}));

export const ResponsivePhotoUpload = ({ src, label, subLabel, onUpload, disabled, ...rest }) => {
  const classes = useStyle();
  const fileRef = useRef();
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
      <input type={"file"} className={classes.input} ref={fileRef} onChange={handleFileChange} />
      <div className={classes.container}>
        <Grid container>
          <Grid item sm={3}>
            <Box pr={2} pt={2}>
              <DualLineLabel title={label} subtitle={subLabel} />
            </Box>
          </Grid>
          {src ? (
            <Grid item>
              <Box pt={2}>
                <img src={src} alt={"upload"} className={classes.image} />
              </Box>
            </Grid>
          ) : (
            <Grid item>
              <Box pt={2}>
                <Button disabled={disabled} color={"primary"} variant={"contained"} onClick={handleClick}>
                  Upload
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </div>
    </FormFieldWrapper>
  );
};
