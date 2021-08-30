import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    itemContainer: {

    },
    lhs: {

    },
    rhs: {

    }
}))

const ItemContainer = ({ item, children }) => {
    return (
        <Grid container>
            <Grid item xs={9}>
                { children }
            </Grid>

        </Grid>
    )
}

export const DefaultCRUDInterface = ({ items, children }) => {
    const classes = useStyle();
    return (
        <div>
            <div>
                { children(items) }
            </div>
        </div>
    )
}