import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box, Card, Stack, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, GridPagination, GridToolbar, gridDateComparator, useGridApiRef } from "@mui/x-data-grid";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { DefaultTableCell } from "./CRUDTableCell";
import { ActionBar } from "./components/ActionBar";

const CustomToolbar = ({ disableToolbar }, props) => {
  return (
    <Box display="flex" justifyContent={disableToolbar ? "flex-end" : "space-between"} alignItems="center" width="100%">
      {disableToolbar ? (
        <GridPagination {...props} />
      ) : (
        <>
          <GridToolbar />
          <GridPagination {...props} />
        </>
      )}
    </Box>
  );
};

const NoRowsOverlay = () => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <Typography variant="h6" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        There are currently no data available
      </Typography>
    </Stack>
  );
};

const StyledMenu = styled((props) => (
  <Menu
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow: "none",
    border: "none",
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const WIDTH_MAPPING = {
  small: 80,
  medium: 100,
  large: 150,
  xlarge: 200,
  xxlarge: 300,
};

const getColDef = (props) => {
  const columns = props.schema?.map((prop) => {
    const Component = prop.component ? prop.component : DefaultTableCell;
    const def = {
      sortingOrder: ["desc", "asc"],
      field: prop.key,
      headerName: prop.label,
      sortable: prop.sortable,
      disableColumnMenu: prop.disableColumnMenu,
      renderCell: ({ value }) => <Component value={value} />,
      width: prop.size === "flex" ? undefined : WIDTH_MAPPING[prop.size] || 50,
      flex: prop.size === "flex" ? 1 : undefined,
      minWidth: 50,
    };

    if (props.isDateTime) {
      def.sortComparator = gridDateComparator;
    }
    return def;
  });
  const buttons = [];
  if (props.onUpdate) {
    buttons.push({ icon: EditIcon, onClick: props.onUpdate });
  }
  if (props.onDelete) {
    buttons.push({ icon: DeleteIcon, onClick: props.onDelete });
  }
  if (props.onView) {
    buttons.push({ icon: RemoveRedEyeOutlinedIcon, onClick: props.onView });
  }

  if (!_.isEmpty(props.actionOptions.buttons)) {
    props.actionOptions.buttons.forEach((button) => {
      buttons.push(button);
    });
  }
  if (!_.isEmpty(buttons)) {
    const minWidth = buttons.reduce((acc, button) => {
      return acc + (button.text ? 100 : 45);
    }, 0);
    columns?.push({
      minWidth,
      field: "_action1",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: (item) => {
        return <RowActionButtons buttons={buttons} row={item.row} />;
      },
    });
  }
  if (!_.isEmpty(props.actionOptions.dropdowns)) {
    columns?.push({
      minWidth: 300,
      field: "_action2",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: (item) => {
        return <CustomizedMenus item={item} actionOptions={props.actionOptions} />;
      },
    });
  }
  return !_.isEmpty(columns) ? columns : [];
};

const RowActionButtons = ({ buttons, row }) => {
  return (
    <Box display={"flex"}>
      {buttons.map(({ onClick, isDisplayed, isHidden, isDisabled, ...rest }, index) => {
        const display = isDisplayed === undefined || (typeof isDisplayed === "function" ? isDisplayed(row) : isDisplayed);
        if (!display) {
          return null;
        }
        const hidden = typeof isHidden === "function" ? isHidden(row) : isHidden;
        const disabled = typeof isDisabled === "function" ? isDisabled(row) : isDisabled;
        return (
          <span key={index} style={{ visibility: hidden ? "hidden" : undefined }}>
            <RowActionButton isDisabled={disabled} onClick={!hidden && onClick ? () => onClick(row) : null} {...rest} />
          </span>
        );
      })}
    </Box>
  );
};

const RowActionButton = ({ text, icon, onClick, tooltips, isDisabled, color }) => {
  const Icon = icon;
  let content;
  if (icon) {
    content = <Icon fontSize="inherit" color={color} />;
  } else {
    content = <>{text}</>;
  }
  if (tooltips) {
    content = (
      <Tooltip id="button-report" title={tooltips}>
        {content}
      </Tooltip>
    );
  }
  const ButtonWrapper = text ? Button : IconButton;
  return (
    <Box mr={2}>
      <ButtonWrapper size={"small"} onClick={onClick} disabled={isDisabled} color={color}>
        {content}
      </ButtonWrapper>
    </Box>
  );
};

const getActionBarOptions = (props) => {
  const rtn = [];
  if (props.onCreate) {
    rtn.push({
      display: "Add",
      value: "create",
      icon: <Add color={"primary"} />,
      onClick: props.onCreate,
    });
  }
  if (!_.isEmpty(props.actionOptions.toolbars)) {
    props.actionOptions.toolbars.forEach(({ display, onClick, color, isDisabled, icon }) => {
      rtn.push({
        display: display,
        color,
        onClick,
        isDisabled,
        icon,
      });
    });
  }
  return rtn;
};

const useOnMount = (props) => {
  const ref = useGridApiRef();
  useEffect(() => {
    ref.current?.setPageSize(props.countPerPage);
  }, [ref, props.countPerPage]);

  return { ref };
};

const CustomizedMenus = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpened = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button variant="contained" disableElevation onClick={handleMenuClick}>
        Options
      </Button>
      <StyledMenu anchorEl={anchorEl} open={isOpened} onClose={handleClose}>
        {props.actionOptions?.dropdowns.map((button, idx) => (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              if (button.onClick) {
                button.onClick(props.item);
              }
            }}
            disableRipple
            key={idx}
            disabled={button.isDisabled}>
            {button.display}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export const DefaultCRUDTable = ({ sortModel = [{ field: "id", sort: "asc" }], ...props }) => {
  const { ref } = useOnMount(props);
  return (
    <Box>
      <ActionBar options={getActionBarOptions(props)} />
      <Card
        sx={{
          width: "100%",
          height: props.items.length > 0 ? props.height : 400,
          boxShadow: "none",
          borderRadius: "8px",
          padding: 2,
          backgroundColor: "white",
          overflow: "hidden",
        }}>
        <DataGrid
          initialState={{
            sorting: { sortModel },
          }}
          apiRef={ref}
          columns={getColDef(props)}
          rows={props.items}
          hideFooter={props.items?.length <= props.countPerPage}
          pageSizeOptions={[props.countPerPage]}
          slots={{
            toolbar: (toolbarProps) => <CustomToolbar {...toolbarProps} {...props} />,
            noRowsOverlay: NoRowsOverlay,
          }}
          checkboxSelection={props.checkboxSelection}
          disableRowSelectionOnClick={props.disableRowSelectionOnClick}
          density="compact"
          sx={{
            // Set the grid background color to white
            backgroundColor: "white",
            border: "none",
            // Column headers with light gray background and bold text
            ".MuiDataGrid-columnHeaders": {
              color: "#333",
              borderBottom: "2px solid #eee",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              borderBottom: "2px solid #eee",
            },
            // Cells with a light border and hover effect
            ".MuiDataGrid-cell": {
              color: "#555",
              "&:hover": {
                backgroundColor: "#f9f9f9",
              },
            },
            ".MuiDataGrid-row.Mui-selected": {
              backgroundColor: "#f9f9f9 !important",
            },
          }}
        />
      </Card>
    </Box>
  );
};

DefaultCRUDTable.defaultProps = {
  height: 800,
  items: [],
  schema: [],
  countPerPage: 20,
  actionOptions: {
    dropdowns: [],
    buttons: [],
    toolbars: [],
  },
  disableToolbar: false,
};

DefaultCRUDTable.propTypes = {
  height: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.oneOf(["small", "medium", "large", "xlarge", "xxlarge", "flex"]).isRequired,
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      component: PropTypes.elementType,
    }),
  ).isRequired,
  countPerPage: PropTypes.number,
  onCreate: PropTypes.func,
  onRead: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func,
  actionOptions: PropTypes.shape({
    dropdowns: PropTypes.arrayOf(
      PropTypes.shape({
        display: PropTypes.string.isRequired,
        color: PropTypes.string,
        onClick: PropTypes.func,
        isDisabled: PropTypes.bool,
      }),
    ),
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        isDisabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        isHidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        isDisplayed: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        text: PropTypes.string,
        icon: PropTypes.elementType,
        onClick: PropTypes.func.isRequired,
        tooltips: PropTypes.string,
        color: PropTypes.string,
      }),
    ),
    toolbars: PropTypes.arrayOf(
      PropTypes.shape({
        display: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        icon: PropTypes.element,
        color: PropTypes.string,
        isDisabled: PropTypes.bool,
      }),
    ),
  }),
  disableToolbar: PropTypes.bool,
};
