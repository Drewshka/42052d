import React from "react";
import { connect } from "react-redux";
import { Grid, FormControl, TextField, InputLabel } from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  secondaryText: {
    color: "#9CADC8",
    fontSize: "1rem",
    marginRight: theme.spacing(6),
    position: "relative",
  },

  textField: {
    width: "45vw",
    marginBottom: "1.5rem",
  },
}));

const Username = (props) => {
  const classes = useStyles();

  return (
    <Grid>
      <InputLabel className={classes.secondaryText}>Username</InputLabel>
      <FormControl margin="normal" required>
        <TextField
          className={classes.textField}
          aria-label="username"
          name="username"
          type="text"
        />
      </FormControl>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Username);
