import React from "react";

import { AsyncButton } from "./AsyncButton";

export default {
  component: AsyncButton,
  title: "AsyncButton",
};

const Template = (args) => <AsyncButton {...args}>Submit</AsyncButton>;

export const Default = Template.bind({});
Default.args = {};
