import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import {Box, Tooltip} from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, GridToolbar, gridDateComparator, useGridApiRef,GridPagination } from "@mui/x-data-grid";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { DefaultTableCell } from "./CRUDTableCell";
import { ActionBar } from "./components/ActionBar";


const CustomToolbar = ({disableToolbar},props) => {
  return (
    <Box
      display="flex"
      justifyContent={disableToolbar ? "flex-end": "space-between"}
      alignItems="center"
      width="100%"
    >
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
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
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
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
  small: 50,
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
    props.actionOptions.buttons.forEach(({ icon, onClick, tooltips }) => {
      buttons.push({ icon, onClick, tooltips });
    });
  }
  if (!_.isEmpty(buttons)) {
    columns?.push({
      minWidth: buttons.length * 45,
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
      {buttons.map(({ icon, onClick, tooltips }, index) => (
        <RowActionButton key={index} tooltips={tooltips} icon={icon} onClick={onClick ? () => onClick(row) : null} />
      ))}
    </Box>
  );
};

const RowActionButton = ({ icon, onClick, tooltips }) => {
  const Icon = icon;
  let content;
  if (tooltips) {
    content = (
      <Tooltip id="button-report" title={tooltips}>
        <Icon fontSize="inherit" />
      </Tooltip>
    )
  } else {
    content = (
      <Icon fontSize="inherit" />
    )
  }
  return (
    <Box mr={2}>
      <IconButton size={"small"} onClick={onClick}>
        { content }
      </IconButton>
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
      <Button variant="contained" disableElevation onClick={handleMenuClick} endIcon={<KeyboardArrowDownIcon />}>
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

export const DefaultCRUDTable = (props) => {
  const { ref } = useOnMount(props);
  return (
    <Box>
      <ActionBar options={getActionBarOptions(props)} />
      <Box height={props.height}>
        <DataGrid
          apiRef={ref}
          columns={getColDef(props)}
          rows={props.items}
          hideFooter={props.items?.length <= props.countPerPage}
          pageSizeOptions={[props.countPerPage]}
          slots={{ toolbar: (toolbarProps) => <CustomToolbar {...toolbarProps} {...props} /> }}
          checkboxSelection={props.checkboxSelection}
          disableRowSelectionOnClick={props.disableRowSelectionOnClick}
          density="compact"
          sx={{
            ".MuiDataGrid-columnHeaders ": {
              backgroundColor: "lightgrey",
            },
            ".MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
          }}

        />
      </Box>
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
        icon: PropTypes.elementType.isRequired,
        onClick: PropTypes.func.isRequired,
        tooltips: PropTypes.string,
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
