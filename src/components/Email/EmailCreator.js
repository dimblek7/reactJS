import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import { store } from "store";
import { Button, Card, Modal } from "react-bootstrap";
import DNDContainer from "components/DNDContainer";
import { previewInNewTab } from "components/Preview";
// import TextareaDropBox from "components/TextareaDropBox";
import Toaster from "components/Toaster";
import { ReducersTypes } from "constants/ReducersTypes";
import { convertDecimalNo } from "utils";
import EmailInput from './EmailInput';
import fe_config from "constants/Configs";
import "./emailcreator.css";

var __html = `<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <title>Notification</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style type="text/css">
    /**
 * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
 */
    @media screen {
      @font-face {
        font-family: "Source Sans Pro";
        font-style: normal;
        font-weight: 400;
        src: local("Source Sans Pro Regular"), local("SourceSansPro-Regular"),
          url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff)
            format("woff");
      }

      @font-face {
        font-family: "Source Sans Pro";
        font-style: normal;
        font-weight: 700;
        src: local("Source Sans Pro Bold"), local("SourceSansPro-Bold"),
          url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff)
            format("woff");
      }
    }

    /**
 * Avoid browser level font resizing.
 * 1. Windows Mobile
 * 2. iOS / OSX
 */
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%; /* 1 */
      -webkit-text-size-adjust: 100%; /* 2 */
    }

    /**
 * Remove extra space added to tables and cells in Outlook.
 */
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }

    /**
 * Better fluid images in Internet Explorer.
 */
    img {
      -ms-interpolation-mode: bicubic;
    }

    /**
 * Remove blue links for iOS devices.
 */
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }

    /**
 * Fix centering issues in Android 4.4.
 */
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }

    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
      background-color: #000;
    }

    .text-bottom {
      font-size: 13px;
      color: #333;
    }

    /**
 * Collapse table borders to avoid space between cells.
 */
    table {
      border-collapse: collapse !important;
    }

    a {
      color: #1a82e2;
    }

    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
  </style>
</head>
<body style="background-color: white">

  <!-- start body -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: white; padding: 10px">
    <!-- start copy block -->
    <tr>
      <td align="center" bgcolor="white">
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="max-width: 600px; background: white; margin-top: 24px; border: 0.5px solid #dfdfdf"
        >
          <tr>
            <td align="center" valign="top" style="padding: 4px; border-bottom: 1px solid #d9d9d9">
              <a href="https://sendgrid.com" target="_blank" style="display: inline-block">
                <img
                  src="https://rajgad-public.s3-us-west-1.amazonaws.com/rajgad_logo_small.png"
                  alt="rajgad"
                  border="0"
                />
              </a>
            </td>
          </tr>

          <!-- start copy -->
          <tr>
            <td
              align="left"
              style="
                padding: 24px;
                padding-top: 12px;
                font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
              "
            >
              <p style="margin: 0">{{details}}</p>
            </td>
          </tr>
          <!-- end copy -->

          <!-- start copy -->
          <tr>
            <td
              align="left"
              bgcolor="#ffffff"
              style="
                padding: 24px;
                font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
              "
            >
              <p style="margin: 0">Best,</p>
              <p style="margin: 0">Team rajgad</p>
              <p style="margin: 0">
                <a href="https://www.rajgad.com">rajgad.com</a> &nbsp;|&nbsp;
                <a href="mailto: contact@rajgad.com">contact@rajgad.com</a>
              </p>
            </td>
          </tr>
          <!-- end copy -->

          <tr class="text-bottom">
            <td
              align="center"
              bgcolor="#e9ecef"
              style="
                padding: 24px;
                font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
              "
            >
              <p style="margin: 0" class="text-bottom">
                rajgad, 1289 Anvilwood Ave, Sunnyvale, CA, 94089-2204 United States
              </p>
              <p style="margin: 0" class="text-bottom">Copyright © 2020 rajgad - All Rights Reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- end copy block -->
  </table>

  <!-- end body -->
</body>
</html>
`;


export const setemailData = (data) => {
  store.dispatch({
    type: ReducersTypes.EMAIL_DATA,
    payload: data,
  });
};

export const resetemail = () => {
  store.dispatch({
    type: ReducersTypes.EMAIL_RESET,
  });
};

function EmailCreator(props) {
  const {
    email: { show, from = "", to = "", cc = "", customerVendorName= "", subject = "", body = "", onSave, files = [], fetchingInvoices = false },
    email,
    charLimit = 2000,
  } = props;

  const handleClose = (event, reason) => {
    return;
    // if (reason === "clickaway") {
    //   return;
    // }
    // resetemail();
  };

  function onChange(key, value) {
    const data = { ...email, [key]: value };
    setemailData(data);
  }

  function removeFiles(index) {
    const updatedFiles = files.filter((d, i) => i !== index);
    const data = { ...email, files: updatedFiles };
    setemailData(data);
  }

  function onDrop({ item, props, monitor }) {
    const maxSize = 1024 * 1024 * 5;
    let updatedFiles = [...files, ...get(item, "files", [])];
    let totalSize = 0;
    updatedFiles.forEach((file) => {
      totalSize = totalSize + file.size;
    });
    if (totalSize > maxSize) {
      Toaster("Maximum attachments size is 5MB", "error");
      return;
    }
    const data = { ...email, files: updatedFiles };
    setemailData(data);
  }

  return (
    <Modal
      show={show}
      size="lg"
      backdrop="static"
      onHide={() => {
        handleClose();
        resetemail();
      }}
      className="mt-4"
    >
      <Modal.Header closeButton>
        <Modal.Title className="h6">New Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ "maxHeight": "calc(90vh - 190px)", "overflowY": "auto" }} className="email-wrapper">
          <div className="m-2 border rounded input-email-box">
            <div className="p-2 d-table-cell text-left label">TO</div>
            <div className="p-2 d-table-cell">
              <EmailInput email={to ? [...to.split(',')] : []} getEmailId={onChange} label="to" />
            </div>
          </div>
          <div className="m-2 border rounded input-email-box">
            <div className="p-2 d-table-cell text-left label">CC</div>
            <div className="p-2 d-table-cell">
              <EmailInput email={cc ? [...cc.split(',')] : []} getEmailId={onChange} label="cc"  />
            </div>
          </div>
          <div className="m-2 border rounded input-email-box">
            <div className="py-2 pl-2">
              <input
                type="text"
                placeholder="Subject"
                className="input-email w-80"
                onChange={(e) => onChange("subject", e.target.value)}
                value={subject}
                pattern={/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
              />
            </div>
          </div>
          {email.emailTemplateData && email.emailTemplateData.length > 0 &&
            (<div className="m-2 border rounded input-email-box">
              <select
                className="form-control"
                onChange={(e) => onChange("body", e.target.value.replace('{{customer.name}}', email.customerVendorName))}
              >
                <option disabled selected>
                  Please select a template
                </option>
                {email.emailTemplateData.map(d => (
                    <option key={d.id} value={d.body}>
                      {d.name}
                    </option>
                  ))}
              </select>
            </div>)
          }
          <div className="m-2">
            <DNDContainer>
              {/* <TextareaDropBox
                onDrop={onDrop}
                maxlength={charLimit}
                onTextChange={(body) => body && onChange("body", body)}
                body={body}
              /> */}
            </DNDContainer>
            <div className="text-right pb-2 text-small text-danger">
              {body.length === charLimit && <i>Max characters limit: {charLimit}</i>}
            </div>
          </div>

          <input
            data-cy="attach"
            type="file"
            id="attach"
            className="d-none"
            multiple
            onChange={(e) => {
              onDrop({ item: e.target });
            }}
          />
          <div className="text-secondary ml-2 my-2">
            <span>
              Attachments:
              <i
                className="fas fa-paperclip cursor-pointer pl-2"
                onClick={() => {
                  document.getElementById("attach").click();
                }}
                title="Add attachments"
              />
            </span>
          </div>
          {fetchingInvoices ? (
            <div className="row mx-2">
              <div className="text-center w-100 p-2 text-secondary ">
                fetching invoices &nbsp; <i className="ml-2 fa fa-spinner fa-spin text-primary" />
              </div>
            </div>
          ) : (
            <div className="row mx-2">
              {files.map((file, i) => {
                const filetTypes = {
                  "pdf": "fa fa-file-pdf-o red-file-highlighter",
                  "jpeg": "fa fa-file-photo-o blue-file-highlighter",
                  "png": "fa fa-file-photo-o blue-file-highlighter",
                  "jpg": "fa fa-file-photo-o blue-file-highlighter",
                  "xlsx": "fa fa-file-excel-o green-file-highlighter",
                  "xls": "fa fa-file-excel-o green-file-highlighter",
                };
                const fileName = file.name.split('.')[file.name.split('.').length - 1];
                return (
                  <Card className="col-md-3 emailthumbnail cursour-pointer" height="80">
                    {!file.isbase64 ? (
                      <div>
                        <div className="file-wrapper">
                          <span className="invoice-file-name">{fileName}</span>
                          <span className="invoice-file-size">{convertDecimalNo(file.size/1000)}kB</span>
                        </div>
                        <div
                          className="file-icon"
                          onClick={() => {
                            if (file.isbase64) {
                              previewInNewTab(JSON.parse(get(file, "content", "")), "pdf");
                            } else {
                              previewInNewTab(URL.createObjectURL(file), "other");
                            }
                          }}
                        >
                          <i className={`${filetTypes[fileName] ? filetTypes[fileName] : 'fa fa-file-o'} fa-7x`}></i>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          previewInNewTab(JSON.parse(get(file, "content", "")), "pdf");
                        }}
                      >
                        <div className="file-wrapper">
                          <span className="invoice-file-name">{fileName}</span>
                          <span className="invoice-file-size">{convertDecimalNo(file.content.length/1000)}kB</span>
                        </div>
                        <div className="file-icon">
                          <i className={`${filetTypes[fileName] ? filetTypes[fileName] : 'fa fa-file-o'} fa-7x`}></i>
                        </div>
                        <div className="overlay"></div>
                      </div>
                    )}
                    <Card.Body>
                      <Card.Text>
                        <div className="row p-0">
                          <div className="col-md-9 text-truncate">
                            <span title={file.name}>{file.name}</span>
                          </div>
                          <div className="col-md-3">
                            <i
                              body="Remove attachment"
                              className="fa fa-remove cursor-pointer pull-right"
                              onClick={() => removeFiles(i)}
                            />
                          </div>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row">
          <div className="col-md-12">
            <Button
              disabled={!to || !subject || !body}
              variant="primary"
              className="pull-right mr-2"
              data-cy="sendemail"
              onClick={() => {
                if (!subject) {
                  Toaster("Please enter subject", "error");
                  return;
                } else if (!body) {
                  Toaster("Please enter text in body", "error");
                  return;
                }
                const _body = __html.replace('{{details}}', body);
                onSave(to, subject, _body, files, cc);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  email: state.email,
});

export default connect(mapStateToProps, null)(EmailCreator);
