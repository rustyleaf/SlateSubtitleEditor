import React from "react";
import { Grid, Typography, Paper, withStyles } from "@material-ui/core";
import classNames from "classnames";

const styles = {
  root: {
    padding: "10px",
    fontSize: "35px",
    lineHeight: "0.5em"
  },
  focused: {
    //boxShadow:'0 0 10px #9ecaed'
  }
};

/**
 * Render a Slate node.
 *
 * @param {Object} props
 * @param {Editor} editor
 * @param {Function} next
 * @return {Element}
 */

const Dialogue = (props, editor, next) => {
  const { attributes, classes, children } = props;

  return (
    <React.Fragment>
      <Grid container>
        <Grid xs={11}>
          <Typography variant="subheading" {...attributes}>
            {children}
          </Typography>
        </Grid>
        <Grid xs={1}>
          <Typography
            style={{ verticalAlign: "center", paddingTop: "12px" }}
            variant="caption"
          >
            {props.len}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Dialogue);
