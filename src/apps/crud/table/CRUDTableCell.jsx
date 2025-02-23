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
