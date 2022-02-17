import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import JoinConversation from "./components/JoinConversation/JoinConversation";

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
    paddingBottom: "1rem",
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
    width: "140px",
    borderRadius: "5px",
  },
  secondaryText: {
    color: "#9CADC8",
    fontSize: "1rem",
    marginRight: theme.spacing(6),
    position: "relative",
    paddingBottom: "1rem",
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
  },
  formInput: {
    marginTop: theme.spacing(10),
  },
  formLine: {
    margin: "16px 0 8px",
  },
  textField: {
    width: "45vw",
    marginBottom: "1rem",
  },
  submit: {
    // marginLeft: theme.spacing(4),
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
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
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
            {"Already have an account?"}
          </Typography>
          <Button
            className={classes.shadowedButton}
            size="large"
            color="primary"
            onClick={() => history.push("/login")}>
            Login
          </Button>
        </Box>
        <Box className={classes.formInput}>
          {/* <Grid container item>
            <Typography>Need to log in?</Typography>
            <Button onClick={() => history.push("/login")}>Login</Button>
          </Grid> */}
          <Typography variant="h1" id="header" className={classes.header}>
            Create an account.
          </Typography>
          {/* <form onSubmit={handleRegister}> */}
          {/* <Form onSubmit={handleRegister}> */}
          <FormControl onSubmit={handleRegister}>
            <Grid>
              <Grid>
                <InputLabel className={classes.secondaryText}>
                  Username
                </InputLabel>
                <FormControl className={classes.formLine}>
                  <TextField
                    // label="Username"
                    className={classes.textField}
                    aria-label="username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <InputLabel className={classes.secondaryText}>
                  E-mail address
                </InputLabel>
                <FormControl className={classes.formLine}>
                  <TextField
                    className={classes.textField}
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <InputLabel className={classes.secondaryText}>
                  Password
                </InputLabel>
                <FormControl
                  error={!!formErrorMessage.confirmPassword}
                  className={classes.formLine}>
                  <TextField
                    className={classes.textField}
                    aria-label="password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid>
                <InputLabel className={classes.secondaryText}>
                  Confirm Password
                </InputLabel>
                <FormControl
                  error={!!formErrorMessage.confirmPassword}
                  className={classes.formLine}>
                  <TextField
                    className={classes.textField}
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid className={classes.submit}>
                <Button
                  className={classes.submit}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large">
                  Create
                </Button>
              </Grid>
            </Grid>
          </FormControl>
          {/* </Form> */}
          {/* </form> */}
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
