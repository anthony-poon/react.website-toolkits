import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { ActionBar } from "./components/ActionBar";

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
  const columns = props.schema?.map(({ size, label, key, sortable, renderCell, disableColumnMenu }) => {
    let widthProps;
    if (size === "flex") {
      widthProps = {
        minWidth: 50,
        flex: 1,
      };
    } else {
      widthProps = {
        minWidth: WIDTH_MAPPING[size] || 50,
      };
    }
    return {
      ...widthProps,
      field: key,
      headerName: label,
      sortable,
      renderCell,
      disableColumnMenu,
    };
  });
  if (props.onUpdate || props.onDelete) {
    columns?.push({
      minWidth: 25,
      field: "_action1",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: (item) => {
        const handleEdit = props.onUpdate ? () => props.onUpdate(item.row) : null;
        const handleDelete = props.onDelete ? () => props.onDelete(item.row) : null;
        return <RowActionButtons onUpdate={handleEdit} onDelete={handleDelete} />;
      },
    });
  }
  if (props.onOtherAction) {
    columns?.push({
      minWidth: 200,
      field: "_action2",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,
      renderCell: (item) => {
        const handleOtherAction = props.onOtherAction ? (action) => props.onOtherAction(action, item.row) : null;
        return <CustomizedMenus onOtherAction={handleOtherAction} actionOptions={props.actionOptions} />;
      },
    });
  }
  return !_.isEmpty(columns) ? columns : [];
};

const RowActionButtons = ({ onUpdate, onDelete, ...rest }) => {
  return (
    <Box display={"flex"}>
      {onUpdate && (
        <Box mr={2}>
          <IconButton {...rest} size={"small"} onClick={onUpdate}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Box>
      )}
      {onDelete && (
        <Box mr={2}>
          <IconButton {...rest} size={"small"} color={"error"} onClick={onDelete}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

const getRolDef = (props) => {
  if (props.onUpdate || props.onDelete) {
    return props.items.map((item) => {
      return {
        ...item,
      };
    });
  } else {
    return props.items;
  }
};

const getActionBarOptions = (props) => {
  const rtn = [];
  if (props.onCreate) {
    rtn.push({
      display: "Add",
      value: "create",
      startIcon: <Add color={"primary"} />,
    });
  }
  if (!_.isEmpty(props.extraButtons)) {
    rtn.push(props.extraButtons);
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
  const handleActionClick = (action, item) => {
    setAnchorEl(null);
    if (props.onOtherAction != null) {
      props.onOtherAction(action, item);
    }
  };
  return (
    <div>
      <Button variant="contained" disableElevation onClick={handleMenuClick} endIcon={<KeyboardArrowDownIcon />}>
        Options
      </Button>
      <StyledMenu anchorEl={anchorEl} open={isOpened} onClose={handleClose}>
        {props.actionOptions?.buttons.map((button, idx) => (
          <MenuItem
            onClick={() => handleActionClick(button.value)}
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
  const handleAction = (action) => {
    switch (action) {
      case "create":
        props.onCreate && props.onCreate();
        break;
      default:
        props.onOtherAction(action);
        break;
    }
  };
  return (
    <Box>
      <ActionBar options={getActionBarOptions(props)} onClick={handleAction} />
      <Box height={props.height}>
        <DataGrid
          apiRef={ref}
          columns={getColDef(props)}
          rows={getRolDef(props)}
          hideFooter={props.items?.length <= props.countPerPage}
          pageSizeOptions={[props.countPerPage]}
          slots={props.disableToolbar ? null : { toolbar: GridToolbar }}
          checkboxSelection={props.checkboxSelection}
          disableRowSelectionOnClick={props.disableRowSelectionOnClick}
        />
      </Box>
    </Box>
  );
};

DefaultCRUDTable.defaultProps = {
  height: 350,
  items: [],
  schema: [],
  countPerPage: 10,
  toolbarOptions: {},
  actionOptions: {},
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
    }),
  ).isRequired,
  countPerPage: PropTypes.number,
  onCreate: PropTypes.func,
  onRead: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onOtherAction: PropTypes.func,
  toolbarOptions: PropTypes.shape({
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        display: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        color: PropTypes.string,
      }),
    ),
  }),
  actionOptions: PropTypes.shape({
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        display: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        color: PropTypes.string,
        isDisabled: PropTypes.bool,
      }),
    ),
  }),
  disableToolbar: PropTypes.bool,
};
