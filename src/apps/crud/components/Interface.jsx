import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyle = makeStyles(theme => ({
    entityContainer: {
    },
    propertyContainer: {
        [theme.breakpoints.up('md')]: {
            paddingRight: hasActions => hasActions ? theme.spacing(3) : 0,
            borderRight: `1px solid ${theme.palette.divider}`,
        },
    },
    actionContainer: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            paddingLeft: hasActions => hasActions ? theme.spacing(3) : 0,
            paddingTop: 0,
            paddingBottom: 0
        }
    },
    sortBarContainer: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    searchBarContainer: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
    }
}))

export const Interface = ({ items, title, toolbar, sortBar, searchBar, renderProperties, renderActions, paginationBar }) => {
    const hasActions = Boolean(renderActions);
    const classes = useStyle({ hasActions });
    return (
        <div>
            <Box mb={4} mt={2}>
                <Typography variant={"h4"}>
                    { title }
                </Typography>
            </Box>
            <Box mb={toolbar ? 2 : 0}>
                { toolbar }
            </Box>
            <Box mb={2}>
                <Grid container>
                    <Grid item xs={12} md={8} className={classes.searchBarContainer}>
                        { searchBar }
                    </Grid>
                    <Grid item xs={12} md={4}  className={classes.sortBarContainer}>
                        { sortBar }
                    </Grid>
                </Grid>
            </Box>
            { items.map((item, index) => (
                <Box key={item.id} className={classes.entityContainer} mt={index === 0 ? 0 : 5}>
                    <Grid container >
                        <Grid item xs={12} md={hasActions ? 9 : 12} className={classes.propertyContainer}>
                            { renderProperties(item) }
                        </Grid>
                        { renderActions && (
                            <Grid item xs={12} md={3} className={classes.actionContainer}>
                                { renderActions(item) }
                            </Grid>
                        ) }
                    </Grid>
                </Box>
            )) }
            <Box mt={2}>
                { paginationBar }
            </Box>
        </div>
    )
}