import React, { useState } from "react";
import { FormControl, FilledInput, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
// import axios from "axios";
// import uniqid from "uniqid";

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
  const [files, setFiles] = useState([]);

  const handleFiles = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const uploadImage = async () => {
    const urls = await Promise.all(
      files.map(async (file) => {
        try {
          const data = new FormData();
          data.append("file", file);
          data.append(
            "upload_preset",
            process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
          );
          data.append(
            "cloud_name",
            process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
          );
          const resp = await fetch(process.env.REACT_APP_URL, {
            method: "post",
            body: data,
          });
          const jsonResp = await resp.json();
          return jsonResp.url;
        } catch (error) {
          console.error(error);
        }
      })
    );
    return urls;
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUrl = await uploadImage();

    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: newUrl,
    };
    await postMessage(reqBody);
    setText("");
    setFiles([]);
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
        <Box>
          <input type="file" multiple={true} onChange={handleFiles}></input>
          <Button
            className={classes.login}
            value={files}
            name="url"
            type="submit"
            color="primary"
            variant="contained"
            size="large">
            Submit
          </Button>
        </Box>
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
