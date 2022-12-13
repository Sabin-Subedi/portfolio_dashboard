import { debounce } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

/*
 * Simple editor component that takes placeholder text as a prop
 */

const color = [
  "#D0F2FF",
  "#74CAFF",
  "#1890FF",
  "#0C53B7",
  "#04297A",
  "#EBD6FD",
  "#B985F4",
  "#7635dc",
  "#431A9E",
  "#200A69",

  "#D1FFFC",
  "#76F2FF",
  "#1CCAFF",
  "#0E77B7",
  "#053D7A",
  "#C8FACD",
  "#5BE584",
  "#00AB55",
  "#007B55",
  "#005249",
  "#FFF7CD",
  "#FFE16A",
  "#FFC107",
  "#B78103",
  "#7A4F01",
  "#FFE7D9",
  "#FFA48D",
  "#FF4842",
  "#B72136",
  "#7A0C2E",

  "#F9FAFB",
  "#F4F6F8",
  "#DFE3E8",
  "#C4CDD5",
  "#919EAB",
  "#637381",
  "#454F5B",
  "#212B36",
  "#161C24",
];
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: props.initialValue || "", theme: "snow" };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // this.props.initialValue &&
    //   this.setState({ editorHtml: this.props.initialValue });
  }

  handleChange(html) {
    this.props.onChange
      ? this.props.onChange(html)
      : this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    const { error, value } = this.props;
    return (
      <div>
        <ReactQuill
          className={error && "ql-error"}
          theme={this.state.theme}
          onChange={this.handleChange}
          value={value || this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={".app"}
          placeholder={this.props.placeholder}
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }
}

Editor.defaultProps = {
  placeholder: "Write something awesome...",
};

Editor.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { color: color },
      {
        background: color,
      },
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["code-block", "link", "image", "video"],
    ["clean"],
  ],

  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  "header",
  "subheader",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default Editor;
