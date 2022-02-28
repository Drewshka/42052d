import React, { useState } from "react";
import {
  FormControl,
  FilledInput,
  Button,
  // ImageList,
  // CardMedia,
  // Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
// import  uploadFiles from "./Uploader";
// import Uploader from "./Uploader";
// import axios from "axios";

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

  const initialImage = {
    featured_image: "", //for single image
    slider_images: [], // (array of strings)
  };

  //* image upload code
  // const [images, setImages] = useState([]);
  const [files, setFiles] = useState("");
  // const [files, setFiles] = useState(initialImage);

  const [url, setUrl] = useState("");
  // const [urls, setUrls] = useState("");
  // const [image, setImage] = useState("");

  // const handleInput = (e) => {
  //   let updateValues = { ...files };
  //   updateValues[e.target.name] = e.target.value;
  //   setFiles(updateValues);
  //   console.log("Update input values", updateValues);
  // };

  // const handleSliderImages = (e) => {
  //   if (e.target.files) {
  //     setFiles({ ...files, slider_images: [...e.target.files] });
  //   }
  //   console.log("Update slider images", files);
  // };

  // const uploadImage = async () => {
  //   const data = new FormData();
  //   data.append("file", files);
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

  const uploadImage = async () => {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
      data.append("upload_preset", "drewshka");
      data.append("cloud_name", "daknpbx8j");
    }
    const resp = await fetch(
      "https://api.cloudinary.com/v1_1/daknpbx8j/image/upload",
      {
        method: "post",
        body: data,
      }
    ).catch((err) => console.log(err));
    const jsonResp = await resp.json();
    console.log(jsonResp);
    return jsonResp.url;
  };

  // const uploadImage = async () => {
  //   // for (let i = 0; i < images.length; i++) {
  //   const formData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //   // for (let image of images) {
  //   // formData.append("image", images[i]);
  //   formData.append("image", files);
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
  //   // }
  // };

  // const uploadImage = async () => {
  //   // for (let i = 0; i < files.length; i++) {
  //   const { files } = document.querySelector('input[type="file"]');
  //   const formData = new FormData();
  //   // for (const key of Object.keys(files)) {
  //   formData.append("files", files[0]);
  //   formData.append("upload_preset", "drewshka");
  //   formData.append("cloud_name", "daknpbx8j");
  //   // }

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
  //   // }
  // };

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
    console.log("CHECKING FILES...", files);
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: [newUrl],
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
          <input
            type="file"
            multiple={true}
            onChange={(event) => {
              setFiles([...files, ...event.target.files]);
              // setFiles(...event.target.files);
              console.log(files);
              console.log(...event.target.files);
            }}></input>
          {/* <input
            type="file"
            multiple={true}
            onChange={handleInput}
            // onChange={(e) => fileSelectedHandler(e)}
          ></input> */}
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
