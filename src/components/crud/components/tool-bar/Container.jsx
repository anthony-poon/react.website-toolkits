import React from "react";
import Box from "@material-ui/core/Box";

export const Container = ({ children }) => {
    return (
        <Box display={"flex"}>
            { children }
        </Box>
    )
}