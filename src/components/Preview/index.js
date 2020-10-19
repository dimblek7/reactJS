import If from "components/If";
import { ReducersTypes } from "constants/ReducersTypes";
import React from "react";
import { store } from "store";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import DocViewer from "./DocViewer";

export const setPreview = data => {
  store.dispatch({
    type: ReducersTypes.PREVIEW_DOCUMENT,
    payload: data
  });
};

export const resetPreview = () => {
  store.dispatch({
    type: ReducersTypes.RESET_PREVIEW_DOCUMENT
  });
};

export const previewInNewTab = (doc, type) => {
  if (doc && type === "pdf") {
    let pdfWindow = window.open("", "_blank");
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(doc) + "'></iframe>"
    );
  } else {
    window.open(doc, "_blank");
  }
};

const Preview = ({
  preview: { show = false, type = "", data = "", name = null, isbase64 = false, ext = null }
}) => (
  <div>
    <Modal show={show} size="lg" backdrop="static" className="mt-4" onHide={resetPreview}>
      <Modal.Header closeButton>
        <div className="w-100">
          <strong>{name}</strong>
          <i
            onClick={() => {
              // method 1
              // const newWindow = window.open(data, "_blank");
              // newWindow.reload();

              // method 2
              // window.open("data:application/pdf," + encodeURI(SAMPLEPDF));

              // method 3
              previewInNewTab(data, "pdf");
            }}
            className="fas fa-expand pull-right cursour-pointer mt-1 mr-2"
            title="expand"
            style={{ fontSize: 16 }}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <If condition={type === "doc"}>
          <DocViewer
            docUrl={`data:application/pdf;base64,${data}`}
            name={name}
            ext={ext}
            isbase64={isbase64}
            onClose={resetPreview}
          />
        </If>
      </Modal.Body>
    </Modal>
  </div>
);

function mapStateToProps(state) {
  return {
    preview: state.preview
  };
}

export default connect(mapStateToProps, null)(Preview);

// import React, { lazy, Suspense } from "react";
// import CustomSpinner from "components/Spinner";

// const PreviewComp = lazy(() => import("./preview.js"));

// const C = (p) => <Suspense fallback={<CustomSpinner />}>{p.Child}</Suspense>;
// const Preview = (p) => <C Child={<PreviewComp {...p} />} />;

// export default Preview;
