import React, { useState } from "react";

const Input = (props) => {
  const [files, setFiles] = useState([]);

  const fileSelectedHandler = (event) => {
    setFiles([...files, ...event.target.files]);
    console.log(...event.target.files);
    console.log(files);
    // this.setState({ files: [...this.state.files, ...e.target.files] });
    // console.log(this.state.files);
  };

  return (
    <form>
      <div>
        <h2>Upload images</h2>
      </div>
      <h3>Images</h3>
      <input type="file" multiple onChange={fileSelectedHandler} />
    </form>
  );
};

export default Input;
