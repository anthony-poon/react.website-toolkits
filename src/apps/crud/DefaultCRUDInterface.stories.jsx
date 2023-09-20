import { makeStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { LoremIpsum } from "lorem-ipsum";
import React from "react";

import { ResponsiveCardContainer } from "../cards";
import { DefaultCRUDInterface } from "./DefaultCRUDInterface";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export default {
  component: DefaultCRUDInterface,
  title: "DefaultCRUDInterface",
  argTypes: { onCreate: { action: "clicked" } },
};

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 800,
    },
  },
}));

const Template = (args) => {
  const classes = useStyle();
  return (
    <ResponsiveCardContainer>
      <div className={classes.container}>
        <DefaultCRUDInterface {...args} />
      </div>
    </ResponsiveCardContainer>
  );
};

const getPlaceholderItems = (count = 10) => {
  return [...Array(count)].map((value, index) => ({
    id: index + 1,
    firstName: lorem.generateWords(1),
    lastName: lorem.generateWords(1),
    address: lorem.generateSentences(1),
    description: lorem.generateParagraphs(1),
  }));
};

export const Default = Template.bind({});
Default.args = {
  countPerPage: 2,
  items: getPlaceholderItems(),
  schema: [
    {
      size: "small",
      label: "ID",
      key: "id",
      sortable: true,
    },
    {
      size: "medium",
      label: "First Name",
      key: "firstName",
      sortable: true,
    },
    {
      size: "medium",
      label: "Last Name",
      key: "lastName",
      sortable: true,
    },
    {
      size: "large",
      label: "Address",
      key: "address",
      sortable: false,
    },
    {
      size: "xlarge",
      label: "Description",
      key: "description",
      sortable: false,
    },
  ],
  toolbarOptions: {
    buttons: [
      {
        display: "Extra 1",
        value: "t_extra_1",
      },
      {
        display: "Extra 2",
        value: "t_extra_2",
      },
    ],
  },
  actionOptions: {
    buttons: [
      {
        display: "Extra 1",
        value: "a_extra_1",
      },
      {
        display: "Extra 2",
        value: "a_extra_2",
        color: "secondary",
      },
    ],
  },
  onCreate: () => console.log("create"),
  onRead: (payload) => console.log("read", payload),
  onUpdate: (payload) => console.log("update", payload),
  onDelete: (payload) => console.log("delete", payload),
  onOtherAction: (action, payload) => console.log(action, payload),
};
