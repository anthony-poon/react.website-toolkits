import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { DataGrid, useGridApiRef,GridToolbar } from "@mui/x-data-grid";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { ActionBar } from "./components/ActionBar";

const WIDTH_MAPPING = {
  small: 50,
  medium: 100,
  large: 150,
  xlarge: 200,
};

const getColDef = (props) => {
  const columns = props.schema?.map(({ size, label, key, sortable }) => {
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
    };
  });
  if (props.onUpdate || props.onDelete) {
    columns?.push({
      minWidth: 25,
      field: "_action",
      headerName: "Action",
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
          slots={{toolbar:GridToolbar}}
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
};

DefaultCRUDTable.propTypes = {
  height: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  schema: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.oneOf(["small", "medium", "large", "xlarge", "flex"]).isRequired,
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
      }),
    ),
  }),
};
