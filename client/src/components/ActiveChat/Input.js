import React, { useRef, useState, useEffect } from "react";
import {
  FormControl,
  FilledInput,
  Button,
  ImageList,
  // CardMedia,
  // Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
// import  uploadFiles from "./Uploader";
import Uploader from "./Uploader";
import axios from "axios";

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
  // const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState("");
  // const [urls, setUrls] = useState("");

  // const [image, setImage] = useState("");

  // const uploadImage = async () => {
  //   console.log(ImageList);
  //   const data = new FormData();
  //   data.append("file", images);
  //   data.append("upload_preset", "drewshka");
  //   data.append("cloud_name", "daknpbx8j");
  //   const resp = await fetch(
  //     "https://api.cloudinary.com/v1_1/daknpbx8j/image/upload",
  //     {
  //       method: "post",
  //       body: data,
  //     }
  //   ).catch((err) => console.log(err));
  //   const jsonResp = await resp.json();
  //   console.log(jsonResp);
  //   return jsonResp.url;
  // };

  const fileSelectedHandler = (event) => {
    setFiles([...files, event.target.files]);
    // setImages(...images, ...event.target.images);
    // setImages([...images, { ...event.target.images }]);

    console.log(event.target.files);
    console.log(files);
    // console.log(url);
  };

  // const uploadImage = async () => {
  //   const formData = new FormData();
  //   for (let i = 0; i < images.length; i++) {
  //   // for (let i = 0; i < files.length; i++) {
  //   // for (let image of images) {
  //   // formData.append("image", images[i]);
  //   formData.append("image", files[0]);
  //   // formData.append("key", "");
  //   formData.append("upload_preset", "drewshka");
  //   formData.append("cloud_name", "daknpbx8j");

  //   const resp = await fetch(
  //     "https://api.cloudinary.com/v1_1/daknpbx8j/image/upload",
  //     {
  //       method: "post",
  //       body: formData,
  //     }
  //   ).catch((err) => console.log(err));
  //   const jsonResp = await resp.json();
  //   console.log(jsonResp);
  //   return jsonResp.url;
  //   }
  // };

  const uploadImage = async () => {
    // for (let i = 0; i < files.length; i++) {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "drewshka");
    formData.append("cloud_name", "daknpbx8j");

    const resp = await fetch(
      "https://api.cloudinary.com/v1_1/daknpbx8j/image/upload",
      {
        method: "post",
        body: formData,
      }
    ).catch((err) => console.log(err));
    const jsonResp = await resp.json();
    console.log(jsonResp);
    return jsonResp.url;
    // }
  };

  // //*

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUrl = await uploadImage();

    // const newUrl = await uploadFiles();

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    console.log("Checking current URL...", [newUrl]);
    // console.log("Checking current URLS...", [urls]);
    console.log("CHECKING FILES...", files);
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: [newUrl],

      // attachments: [url],
    };
    // console.log(image);
    console.log(url);
    await postMessage(reqBody);
    setText("");
    // setUrl("");
  };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      action="/profile-upload-multiple">
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
          {/* <input
            type="file"
            multiple={true}
            onChange={(event) => {
              setImage(...event.target.files);
              console.log(...event.target.files);
            }}></input> */}
          <input
            type="file"
            multiple={true}
            // onChange={fileSelectedHandler}
            onChange={(e) => fileSelectedHandler(e)}></input>
          <Button
            className={classes.login}
            // onClick={uploadImage}
            value={files}
            name="url"
            type="submit"
            color="primary"
            variant="contained"
            size="large">
            Submit
          </Button>
        </div>
        {/* <div>
          <h1>Uploaded image will be displayed here</h1>
          <Card className={classes.card}>
            <CardMedia className={classes.media} component="img" src={url} />
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
