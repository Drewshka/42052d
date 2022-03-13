import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Card, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  textMultiple: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
    marginBottom: "0.5rem",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  images: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    flexDirection: "row",
  },
  image: {
    height: "10rem",
    width: "10rem",
    objectFit: "cover",
  },
  imageMultiple: {
    height: "6rem",
    width: "8rem",
    objectFit: "cover",
  },
  imageCard: {
    marginRight: "0.5rem",
    borderRadius: "4px 4px 0px 4px",
    "&:last-child": {
      marginRight: "0",
    },
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, isMostRecentRead, attachments } = props;

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {attachments !== null && (
        <Box>
          {text && attachments.length > 1 && (
            <Typography
              className={
                attachments.length > 1 ? classes.textMultiple : classes.text
              }>
              {text}
            </Typography>
          )}
          <Box className={classes.bubble}>
            {attachments && (
              <Box className={classes.images}>
                {attachments.map((image) => {
                  return (
                    <Card className={classes.imageCard} key={image}>
                      <CardMedia
                        src={image}
                        alt="data-url"
                        component="img"
                        className={
                          attachments.length > 1
                            ? classes.imageMultiple
                            : classes.image
                        }
                      />
                    </Card>
                  );
                })}
              </Box>
            )}
            {text && (
              <Typography
                style={{
                  display:
                    attachments.length === 1 || attachments.length === 0
                      ? "block"
                      : "none",
                }}
                className={classes.text}>
                {text}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      {isMostRecentRead && (
        <Avatar
          alt={otherUser.username}
          className={classes.small}
          src={otherUser.photoUrl}></Avatar>
      )}
    </Box>
  );
};

export default SenderBubble;
