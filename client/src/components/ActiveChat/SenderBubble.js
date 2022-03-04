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
    // margin: "0 0.5rem",
  },
  image: {
    height: "10rem",
    width: "10rem",
    // margin: "0 0.5rem",
  },
  imageCard: {
    // marginRight: "0.5rem",
    display: "flex",
    justifyContent: "center",
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, otherUser, isMostRecentRead, attachments } = props;
  // console.log(attachments);

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
        <Typography className={classes.text}>{text}</Typography>
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

// const SenderBubble = (props) => {
//   const classes = useStyles();
//   const { time, text } = props;
//   return (
//     <Box className={classes.root}>
//       <Typography className={classes.date}>{time}</Typography>
//       <Box className={classes.bubble}>
//         <Typography className={classes.text}>{text}</Typography>
//       </Box>
//     </Box>
//   );
// };
