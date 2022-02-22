import React, { useState } from "react";
import {
  // FormControl,
  // FilledInput,
  CardMedia,
  Card,
  Button,
} from "@material-ui/core";
// import axios from "axios";

// class Uploader extends Component {
const Uploader = (props) => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "drewshka");
    data.append("cloud_name", "daknpbx8j");
    fetch("https://api.cloudinary.com/v1_1/daknpbx8j/image/upload", {
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

  // state = { cdn_url: null };

  // fileInput = React.createRef();

  // uploadFile = () => {
  //   if (!this.fileInput.current.files.length) {
  //     console.log("No file was selected");
  //     return;
  //   }

  //   // Grab the file from our ref
  //   const file = this.fileInput.current.files[0];

  //   // Build some FormData to submit to our server
  //   const data = new FormData();
  //   data.append("file", file);
  //   console.log(file);
  //   // If you want to add any extra info to this post
  //   data.append("description", "blah blah blah");
  //   data.append("whatever", "some other meta data");

  //   // Send it to our upload API route
  //   axios.post("/api/upload", data).then((response) => {
  //     this.setState({
  //       cdn_url: response.data.cdn_url,
  //     });
  //     console.log(response);
  //   });
  // };

  // render() {
  // console.log(this.state.cdn_url);
  return (
    <div>
      <input
        type="file"
        onChange={(event) => setImage(event.target.files[0])}></input>
      <Button
        onClick={uploadImage}
        value={url}
        name="url"
        type="submit"
        color="primary"
        variant="contained"
        size="large">
        Upload
      </Button>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <Card>
          <CardMedia component="img" src={url} />
        </Card>
      </div>
    </div>
  );
  // }
};

export default Uploader;
