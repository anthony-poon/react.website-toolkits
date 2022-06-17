import React from "react";
import {FormFieldWrapper} from "./FormFieldWrapper";
import {DualLineLabel} from "./DualLineLabel";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        ...theme.typography.h5
    },
}))

export const FormTitle = ({ borderBottom = false, borderTop = false, title, subtitle }) => {
    const classes = useStyle();
    return (
        <FormFieldWrapper>
            <DualLineLabel
                classes={classes}
                title={title}
                subtitle={subtitle}
            />
        </FormFieldWrapper>
    )
}