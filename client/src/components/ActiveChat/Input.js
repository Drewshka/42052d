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

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "drewshka");
    data.append("cloud_name", "daknpbx8j");
    fetch("  https://api.cloudinary.com/v1_1/daknpbx8j/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  //*

  const handleChange = (event) => {
    setText(event.target.value);
    // setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      // attachments: this.data.url,
    };
    console.log(event.target.image);
    console.log(image);
    console.log(url);
    await postMessage(reqBody);
    setText("");
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
          <input
            type="file"
            // onChange={handleChange}
            onChange={(event) => setImage(event.target.files[0])}></input>
          {/* <button onClick={uploadImage}>Upload</button> */}
          <Button
            className={classes.login}
            onClick={uploadImage}
            value={image}
            name="image"
            type="submit"
            color="primary"
            variant="contained"
            size="large">
            Upload
          </Button>
        </div>
        <div>
          <h1>Uploaded image will be displayed here</h1>
          <Card className={classes.card}>
            <CardMedia className={classes.media} component="img" src={url} />
          </Card>
          {/* <img src={url} alt="upload" /> */}
          {/* <Image src={url} /> */}
        </div>
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
