import { Button, Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

import { ConfirmationDialog } from "./ConfirmationDialog";

export default {
  component: ConfirmationDialog,
  title: "ConfirmationDialog"
};

const Template = (args) => {
  return <ConfirmationDialog {...args}>Do you want to submit this form?</ConfirmationDialog>;
};

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  isOpen: true
};
