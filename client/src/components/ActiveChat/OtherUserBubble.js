import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Card, CardMedia } from "@material-ui/core";
import uniqid from "uniqid";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
  },
  secondaryBubble: {
    backgroundImage: "linear-gradient(225deg, #FFFFF 0%, #FFFFF 100%)",
    borderRadius: "0 10px 10px 10px",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8,
  },
  textMultiple: {
    fontSize: 14,
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
    marginBottom: "0.5rem",
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
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
    backgroundColor: "rgba(0, 0, 0, 0.87);",
  },
  imageCard: {
    marginRight: "0.5rem",
    borderRadius: "4px 4px 0px 4px",
    "&:last-child": {
      marginRight: "0",
    },
  },
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, attachments } = props;
  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {time}
        </Typography>
        <Box>
          {text && attachments.length > 1 && (
            <Typography
              className={
                attachments.length > 1 ? classes.textMultiple : classes.text
              }>
              {text}
            </Typography>
          )}
          <Box
            className={
              attachments.length > 1 ? classes.secondaryBubble : classes.bubble
            }>
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
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
