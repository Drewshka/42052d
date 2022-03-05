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
      <Box className={classes.bubble}>
        <Box className={classes.images}>
          {attachments.map((image, i) => {
            return (
              <Card className={classes.imageCard} key={i}>
                <CardMedia
                  src={image}
                  alt="data-url"
                  component="img"
                  className={classes.image}
                />
              </Card>
            );
          })}
        </Box>
        {text && <Typography className={classes.text}>{text}</Typography>}
      </Box>
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
