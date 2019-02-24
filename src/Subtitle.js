import React from "react";
import { Grid, Typography, Paper, withStyles } from "@material-ui/core";
import classNames from "classnames";
import Dialogue from "./Dialogue";

const styles = {
  root: { padding: "20px" },
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

const Subtitle = (props, editor, next) => {
  const { attributes, classes, children } = props;
  const sub = {};
  sub.len = children.reduce((sum, x) => {
    return (sum += x.props.node.text.length);
  }, 0);
  sub.lineLength = 42;
  const timecode = props.tc || "00:00:00:00";

  return (
    <React.Fragment>
      <Grid container spacing={8}>
        <Grid item xs={2}>
          <Typography
            variant="subtitle1"
            align="center"
            style={{ verticalAlign: "middle", paddingTop: "24px" }}
            color="textSecondary"
          >
            {timecode}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Paper
            elevation={props.isFocused ? 20 : 4}
            square={false}
            className={classNames(
              props.isFocused ? classes.focused : "",
              classes.root
            )}
          >
            {children}
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Typography
            style={{ verticalAlign: "middle", paddingTop: "24px" }}
            variant="caption"
          >
            {sub.len} / {sub.lineLength}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(Subtitle);
