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
  const [files, setFiles] = useState("");
  // const [urls, setUrls] = useState("");

  const handleFiles = (event) => {
    setFiles([...files, ...event.target.files]);
  };

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
  //   setUrls([urls, jsonResp]);
  //   return jsonResp.url;
  // };

  const uploadImage = async () => {
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "drewshka");
      data.append("cloud_name", "daknpbx8j");
      const resp = await fetch(
        "https://api.cloudinary.com/v1_1/daknpbx8j/image/upload",
        {
          method: "post",
          body: data,
        }
      ).catch((err) => console.log(err));
      const jsonResp = await resp.json();
      // console.log(jsonResp);
      urls.push(jsonResp.url);
    }
    return urls;
  };

  // //*

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUrl = await uploadImage();

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    console.log("Checking current URL...", [newUrl]);
    console.log("CHECKING FILES...", [files]);

    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: newUrl,
    };
    console.log(reqBody);
    await postMessage(reqBody);
    setText("");
    setFiles("");
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
          {/* <input
            type="file"
            multiple={true}
            onChange={(event) => {
              setFiles([...files, ...event.target.files]);
              // setFiles(...event.target.files);
              console.log(files);
              console.log(...event.target.files);
            }}></input> */}
          <input type="file" multiple={true} onChange={handleFiles}></input>
          <Button
            // onClick={handleImageUpload}
            className={classes.login}
            value={files}
            name="url"
            type="submit"
            color="primary"
            variant="contained"
            size="large">
            Submit
          </Button>
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
