import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "space-around",
        [theme.breakpoints.up("md")]: {
            justifyContent: "flex-end",
        }
    }
}))

export const PaginationBar = ({ pageCount, currPage, onChange }) => {
    const classes = useStyle();
    return (
        <Box py={2} className={classes.container}>
            <Pagination count={pageCount} page={currPage} onChange={onChange} />
        </Box>
    )
}