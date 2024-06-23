import { DateTime } from "luxon";
import React from "react";

export const DefaultTableCell = ({ value }) => {
  return <>{value}</>;
};

export const DateTableCell = ({ value }) => {
  const str = DateTime.fromISO(value, { setZone: true }).toFormat("dd/MM/yy");
  return <>{str}</>;
};

export const DateTimeTableCell = ({ value }) => {
  const str = DateTime.fromISO(value, { setZone: true }).toFormat("dd/MM/yy HH:mm a");
  return <>{str}</>;
};
