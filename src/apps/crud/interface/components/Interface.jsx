import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

const ItemPropertyContainer = ({ hasActions, children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const style = {
    paddingRight: hasActions && isDesktop ? theme.spacing(3) : 0,
    borderRight: `1px solid ${theme.palette.divider}`,
  };
  return (
    <Grid item xs={12} md={hasActions ? 9 : 12} style={style}>
      {children}
    </Grid>
  );
};

const ItemActionContainer = ({ hasActions, children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const style = {
    paddingTop: isDesktop ? 0 : theme.spacing(3),
    paddingBottom: isDesktop ? 0 : theme.spacing(2),
    paddingLeft: isDesktop && hasActions ? theme.spacing(3) : 0,
  };
  return (
    <Grid item xs={12} md={3} style={style}>
      {children}
    </Grid>
  );
};

export const Interface = ({
  items,
  title,
  toolbar,
  sortBar,
  searchBar,
  renderProperties,
  renderActions,
  paginationBar,
}) => {
  const hasActions = Boolean(renderActions);
  return (
    <div>
      <Box mb={4} mt={2}>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant={"h4"}>{title}</Typography>
          </Grid>
          <Grid item xs={3}>
            {toolbar}
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Box pt={2} pr={2} pb={2}>
              {searchBar}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box py={2}>{sortBar}</Box>
          </Grid>
        </Grid>
      </Box>
      {items.map((item, index) => (
        <Box key={item.id} mt={index === 0 ? 0 : 5}>
          <Grid container>
            <ItemPropertyContainer hasActions={hasActions}>{renderProperties(item)}</ItemPropertyContainer>
            {renderActions && <ItemActionContainer hasActions={hasActions}>{renderActions(item)}</ItemActionContainer>}
          </Grid>
        </Box>
      ))}
      <Box mt={2}>{paginationBar}</Box>
    </div>
  );
};
