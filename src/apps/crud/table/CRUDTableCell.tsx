import { DateTime } from "luxon";
import React from "react";

import { StringUtils } from "../../../utils";

export const DefaultTableCell = ({ value }: { value: string }) => {
  return <>{value}</>;
};

export const DateTableCell = ({ value }: { value: string }) => {
  const str = value ? DateTime.fromISO(value, { setZone: true }).toFormat("dd/MM/yy") : "-";
  return <>{str}</>;
};

export const DateTimeTableCell = ({ value }: { value: string }) => {
  const str = value ? DateTime.fromISO(value, { setZone: true }).toFormat("dd/MM/yy h:mm a") : "-";
  return <>{str}</>;
};

export const TimeTableCell = ({ value }: { value: string }) => {
  const str = value ? DateTime.fromISO(value, { setZone: true }).toFormat("h:mm a") : "-";
  return <>{str}</>;
};

export const RelativeDateTableCell = ({ value }: { value: string }) => {
  const str = value
    ? StringUtils.toTitleCase(DateTime.fromISO(value, { setZone: true }).setLocale("en").toRelativeCalendar())
    : "-";
  return <>{str}</>;
};

export const Time24Cell = ({ value }: { value: string }) => {
  const str = value ? DateTime.fromISO(value, { setZone: true }).toFormat("HH:mm") : "-";
  return <>{str}</>;
};

export const DateTime24Cell = ({ value }: { value: string }) => {
  const str = value ? DateTime.fromISO(value, { setZone: true }).toFormat("dd/MM/yy HH:mm") : "-";
  return <>{str}</>;
};
