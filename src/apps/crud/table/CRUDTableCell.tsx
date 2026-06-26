import { Box, Tooltip } from "@mui/material";
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

type StatusDotCellProps = { value: boolean; trueLabel?: string; falseLabel?: string };

export const StatusDotCell = ({ value, trueLabel = "Enabled", falseLabel = "Disabled" }: StatusDotCellProps) => {
  return (
    <Tooltip title={value ? trueLabel : falseLabel} disableInteractive enterDelay={500}>
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: (theme) => (value ? theme.palette.success.main : theme.palette.error.main),
        }}
      />
    </Tooltip>
  );
};

// Factory for table schemas (DefaultCRUDTable passes only `value` to a column's component),
// so per-column tooltip labels are baked in here, e.g. makeStatusDotCell("Has paper", "No paper").
export const makeStatusDotCell = (trueLabel: string, falseLabel: string) => {
  const StatusDotCellWithLabels = ({ value }: { value: boolean }) => (
    <StatusDotCell value={value} trueLabel={trueLabel} falseLabel={falseLabel} />
  );
  return StatusDotCellWithLabels;
};
