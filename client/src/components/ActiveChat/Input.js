import React, { useState } from "react";
import {
  FormControl,
  FilledInput,
  CardMedia,
  Card,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
// import Uploader from "./Uploader";
// import Image from "mui-image";
// import { Image } from "mui-image";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;

  //* image upload code
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = async () => {
    console.log(image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "drewshka");
    data.append("cloud_name", "daknpbx8j");
    const resp = await fetch(
      "https://api.cloudinary.com/v1_1/daknpbx8j/image/upload",
      {
        method: "post",
        body: data,
      }
    ).catch((err) => console.log(err));
    // .then((resp) => resp.json())
    const jsonResp = await resp.json();
    // .then((data) => {
    // setUrl(data.url);
    // setUrl(jsonResp.url);
    console.log(jsonResp);
    return jsonResp.url;

    // })
    // .catch((err) => console.log(err));
  };

  //*

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUrl = await uploadImage();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    console.log("Checking current URL...", url);
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      // attachments: [url],
      attachments: [newUrl],
    };
    console.log(image);
    console.log(url);
    await postMessage(reqBody);
    setText("");
    // setUrl("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <div>
          {/* <Uploader /> */}
          {/* <input
            type="file"
            onChange={(event) => {
              setImage(event.target.files[0]);
              console.log(event.target.files[0]);
            }}></input> */}
          <input
            type="file"
            multiple
            onChange={(event) => setImage(...event.target.files)}></input>
          <Button
            className={classes.login}
            // onClick={uploadImage}
            value={url}
            name="url"
            type="submit"
            color="primary"
            variant="contained"
            size="large">
            Submit
          </Button>
          {/* <Button
            className={classes.login}
            onClick={uploadImage}
            value={url}
            name="url"
            type="upload"
            color="primary"
            variant="contained"
            size="large">
            Upload
          </Button> */}
        </div>
        {/* <div>
          <h1>Uploaded image will be displayed here</h1>
          <Card className={classes.card}>
            <CardMedia className={classes.media} component="img" src={image} />
          </Card>
        </div> */}
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
