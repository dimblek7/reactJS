import { getUrlExtension } from "handlers/getters";
import React, { Component } from "react";

export function getDocViewFromExt({ docUrl, width, isbase64, ext }) {
  const ext1 = ext || getUrlExtension(docUrl);
  switch (ext1) {
    case "jpg":
    case "jpeg":
    case "png":
      return <ImgView docUrl={docUrl} width={width} />;
    case "pdf":
      return <PdfView docUrl={docUrl} width={width} isbase64={isbase64} />;
    case "ppt":
    case "pptx":
      return <PptView docUrl={docUrl} width={width} />;
    case "doc":
    case "docx":
    case "txt":
    case "text":
    case "rtf":
      return <DocView docUrl={docUrl} width={width} />;
    default:
      return null;
  }
}

const ImgView = ({ docUrl, width = "" }) => (
  <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
    <img src={docUrl} alt="" style={{ objectFit: "scale-down", overflow: "auto" }} className={`${width}`} />
  </div>
);

const PdfView = ({ docUrl, isbase64 }) => (
  <div>
    {!isbase64 ? (
      <embed
        className="h-100 w-100 minht-300 holds-the-iframe"
        src={`https://drive.google.com/viewerng/
          viewer?embedded=true&url=${docUrl}`}
        alt="loading"
      />
    ) : (
      <embed className="h-100 w-100 minht-300 holds-the-iframe" src={`${docUrl}`} alt="loading" />
    )}
  </div>
);

const PptView = ({ docUrl }) => (
  <embed
    className="holds-the-iframe h-100 w-100 minht-300"
    src={`https://view.officeapps.live.com/op/embed.aspx?src=${docUrl}`}
  />
);

// const DocView = ({ docUrl }) => <embed className="h-100 w-100" src={`https://docs.google.com/viewerng/viewer?url=${docUrl}`} />;

const DocView = ({ docUrl }) => (
  <embed className="holds-the-iframe h-100 w-100 minht-300" src={`https://docs.google.com/gview?url=${docUrl}&embedded=true`} />
);

const TxtView = ({ docUrl }) => <embed className="holds-the-iframe h-100 w-100 minht-300" type="text/plain" src={docUrl} />;

export default class DocViewer extends Component {
  render() {
    const { docUrl, onClose, name, isbase64, ext } = this.props;
    // const h = window.innerHeight - 66;
    // const fname = getFnameFromUrl(docUrl);
    return getDocViewFromExt({ docUrl, isbase64, ext });
  }
}
