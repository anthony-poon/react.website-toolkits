import { DateTime } from "luxon";
import React from "react";

export const DefaultTableCell = ({ value }) => {
  return <>{value}</>;
};

export const DateTableCell = ({ value }) => {
  const str = value ? DateTime.fromISO(value, { setZone: true }).toFormat("dd/MM/yy") : "-";
  return <>{str}</>;
};

export const DateTimeTableCell = ({ value }) => {
  const str = value ? DateTime.fromISO(value, { setZone: true }).toFormat("dd/MM/yy HH:mm a") : "-";
  return <>{str}</>;
};

export const TimeTableCell = ({ value }) => {
  const str = value ? DateTime.fromISO(value, { setZone: true }).toFormat("hh:mm a") : "-";
  return <>{str}</>;
};

export const RelativeDateTableCell = ({ value }) => {
  const priorityToRelativeDate = {
    1: "Today",
    2: "These 3 Days",
    3: "This Week",
    4: "This Month",
    5: "This Year",
    6: "More than a Year",
  };

  const str = priorityToRelativeDate[value] || "-";
  return <>{str}</>;
};