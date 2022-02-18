import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import JoinConversation from "./components/JoinConversation/JoinConversation";
import Username from "./components/Form/Username";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100vh",
  },
  item: {
    height: "fill",
  },
  header: {
    fontSize: "26px",
    paddingBottom: "2rem",
  },

  form: {
    padding: theme.spacing(10),
    paddingTop: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4),
    },
  },
  shadowedButton: {
    boxShadow: "0px 2px 12px rgba(74, 106, 149, 0.2)",
    padding: theme.spacing(2, 4),
    height: "54px",
    borderRadius: "5px",
    // width: "170px",
  },
  secondaryText: {
    color: "#9CADC8",
    fontSize: "1rem",
    marginRight: theme.spacing(6),
    position: "relative",
    // paddingBottom: "1rem",
  },
  forgot: {
    position: "absolute",
    left: "90%",
    right: "26rem",
    top: "1.65rem",
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center",
    color: "#3a8dff",
    // paddingBottom: "4px",
  },
  input: {
    color: "rgb(230, 230, 230)",
  },
  media: {
    height: "100%",
  },
  card: {
    position: "relative",
    height: "100%",
  },

  createAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start",
    },
  },
  formInput: {
    marginTop: theme.spacing(10),
  },
  textField: {
    width: "45vw",
    marginBottom: "1.5rem",
    // paddingTop: "0",
  },

  login: {
    padding: "1rem 4rem 1rem 4rem",
    width: "160px",
    height: "56px",
    borderRadius: "3px",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container direction="row" className={classes.root}>
      <JoinConversation />
      <Grid item xs={7} className={classes.form}>
        <Box className={classes.createAccount}>
          <Typography color="secondary" className={classes.secondaryText}>
            {"Don't have an account?"}
          </Typography>
          <Button
            className={classes.shadowedButton}
            size="large"
            color="primary"
            onClick={() => history.push("/register")}>
            Create Account
          </Button>
        </Box>
        <Box className={classes.formInput}>
          <Typography variant="h1" id="header" className={classes.header}>
            Welcome back!
          </Typography>
          <form onSubmit={handleLogin}>
            <Grid>
              <Username />
              <InputLabel className={classes.secondaryText}>
                Password
                <Typography id="forgot" className={classes.forgot}>
                  Forgot?
                </Typography>
              </InputLabel>
              <FormControl margin="normal" required>
                <TextField
                  className={classes.textField}
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
              <Grid className={classes.login}>
                <Button
                  className={classes.login}
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
