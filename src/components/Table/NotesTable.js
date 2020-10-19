import { instance } from "actions/axiosInstance";
import "assets/css/paymentdetails.css";
import filterarrow from "assets/images/filter-arrow.png";
import { Accordion, Card } from "react-bootstrap";
import TextAreaModal from "components/Popups/TextArea";
import { handleAPIError } from "handlers/setters";
import get from "lodash/get";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import { getFormattedDate } from "utils/dates";
import { resetconfirmationboxData, setconfirmationboxData } from "../ConfirmationBox";
import TextareaEditorCell from "./TextareaEditorCell";
import Toaster from "../Toaster";
import CustomSpinner from "../Spinner";

function addURL(type) {
  let res = "";
  type === "payables" && (res = `supplier/note`);
  type === "non_invoiced" && (res = `supplier/note`);
  type === "receivables" && (res = `customer/note`);
  type === "vendors" && (res = `supplier/note`);
  type === "customers" && (res = `customer/note`);
  return res;
}

function getURL(type, id) {
  let res = "";
  type === "payables" && (res = `supplier/note?per_page=1000&invoice_id=${id}`);
  type === "non_invoiced" && (res = `supplier/note?per_page=1000&non_invoiced_id=${id}`);
  type === "receivables" && (res = `customer/note?per_page=1000&invoice_id=${id}`);
  type === "vendors" && (res = `supplier/note?per_page=1000&supplier_id=${id}`);
  type === "customers" && (res = `customer/note?per_page=1000&customer_id=${id}`);
  return res;
}

function putURL(type, id) {
  let res = "";
  type === "payables" && (res = `supplier/note?id=${id}`);
  type === "non_invoiced" && (res = `supplier/note?id=${id}`);
  type === "receivables" && (res = `customer/note?id=${id}`);
  type === "vendors" && (res = `supplier/note?id=${id}`);
  type === "customers" && (res = `customer/note?id=${id}`);
  return res;
}

function deleteURL(type, id) {
  let res = "";
  type === "payables" && (res = `supplier/note/delete?id=${id}`);
  type === "non_invoiced" && (res = `supplier/note/delete?id=${id}`);
  type === "receivables" && (res = `customer/note/delete?id=${id}`);
  type === "vendors" && (res = `supplier/note/delete?id=${id}`);
  type === "customers" && (res = `customer/note/delete?id=${id}`);
  return res;
}

const keyObject = {
  payables: "supplier_id",
  non_invoiced: "supplier_id",
  receivables: "customer_id",
  vendors: "supplier_id",
  customers: "customer_id"
};

// payables, receivables, vendors, customers
function NotesTable(props) {
  const { type = "", id, data } = props;
  const [notes, setnotes] = useState(null);
  const [showNoteModal, setshowNoteModal] = useState(false);
  const [showTable, setshowTable] = useState(false);
  const url = getURL(type, id);

  useEffect(() => {
    if (!id) {
      return;
    }
    refreshNotes();
  }, [id, url, showTable]);

  function refreshNotes() {
    instance
      .get(url)
      .then(resp => {
        let _data = get(resp, "data.result", []);
        let result = [];
        _data.forEach(_note => {
            if(!result.find(x => x.date == _note.date && x.note == _note.note)){
              result.push(_note);
            }
        });
        setnotes(result);
      })
      .catch(e => handleAPIError(e));
  }

  const columns = [
    {
      Header: () => (
        <span>
          Date <img src={filterarrow} alt=" " />
        </span>
      ),
      accessor: "date",
      className: "ml-2",
      width: 140,
      Cell: props => get(props, "value", "") ? getFormattedDate(new Date(get(props, "value", ""))) : "-"
    },
    {
      Header: () => (
        <span>
          User <img src={filterarrow} alt=" " />
        </span>
      ),
      accessor: "followed_by_user",
      width: 150,
      Cell: props => get(props, "value.username", "") || "-"
    },
    {
      Header: () => (
        <span>
          Note <img src={filterarrow} alt=" " />
        </span>
      ),
      accessor: "note",
      style: { whiteSpace: "unset" },
      Cell: props => (
        <TextareaEditorCell
          {...props}
          id="note_value"
          iscellcomponent
          updateValue={value => {
            const { original, index } = props;
            const key = keyObject[type];
            const custumerOrVendorId = get(data, "customer.id", "") || get(data, "supplier.id", "") || id;
            instance
              .put(
                putURL(type, original.id),
                {
                  date: moment().format("MM/DD/YYYY"),
                  note: value,
                  invoice_id: original.invoice_id,
                  [key]: custumerOrVendorId
                }
              )
              .then(() => {
                let updatedAccData = notes;
                updatedAccData[index].note = value;
                Toaster("Edited successfully", "success");
                setnotes(updatedAccData);
              });
          }}
        />
      )
    },
    {
      Header: "",
      accessor: "id",
      width: 100,
      Cell: props => (
        <span className="">
          <i
            id="delete"
            className="fa fa-trash-o ml-5"
            aria-hidden="true"
            onClick={() => {
              const { original, index } = props;
              setconfirmationboxData({
                variant: "warning",
                msg: "Are you sure you want to delete?",
                onSave: () => {
                  resetconfirmationboxData();

                  instance
                    .put(
                      deleteURL(type, original.id),
                      {
                        date: moment().format("MM/DD/YYYY")
                      }
                    )
                    .then(() => {
                      let updatedAccData = notes.filter((x, i) => i !== index);
                      Toaster("Deleted successfully", "success");
                      setnotes(updatedAccData);
                    });
                }
              });
            }}
          />
        </span>
      )
    }
  ];

  // const showAddButton = type === "payables" || type === "receivables";
  const showAddButton = true;
  const TableData = notes || [];
  return (
    <div className="mb-4">
      <TextAreaModal
        header="Add Note"
        show={showNoteModal}
        handleClose={() => setshowNoteModal(false)}
        handleSubmit={value => {
          const key = keyObject[type];
          const custumerOrVendorId = get(data, "customer.id", "") || get(data, "supplier.id", "") || id;
          let postdata;
          if (type === "payables" || type === "receivables") {
            postdata = {
              date: moment().format("MM/DD/YYYY"),
              note: value,
              invoice_id: id,
              [key]: JSON.stringify(custumerOrVendorId)
            };
          } else if (type === "non_invoiced") {
            postdata = {
              date: moment().format("MM/DD/YYYY"),
              note: value,
              non_invoiced_id: id,
              [key]: JSON.stringify(custumerOrVendorId)
            }
          } else {
            postdata = {
              date: moment().format("MM/DD/YYYY"),
              note: value,
              [key]: JSON.stringify(custumerOrVendorId)
            };
          }
          instance
            .put(addURL(type), postdata)
            .then(() => {
              setshowNoteModal(false);
              Toaster("Notes added", "success");
              refreshNotes();
            });
        }}
      />

      <Accordion className="col-md-12">
        <Accordion.Toggle
          className="border mt-4 mb-2 py-0 px-3 cursour-pointer bg-light-grey"
          onClick={() => setshowTable(!showTable)}
          as={Card.Header}
          eventKey="1"
        >
          <div style={{ height: 46 }}>
            <h6 className="my-0 pull-left" style={{ paddingTop: 12 }}>
              Notes
            </h6>
            {showAddButton && showTable && (
              <i
                style={{ marginTop: 10 }}
                onClick={e => {
                  e.stopPropagation();
                  setshowNoteModal(true);
                }}
                className={`fa fa-plus ml-3 border text-primary p-1 ${showAddButton ? "show" : "hide"}`}
                title="Click to add item"
                aria-hidden="true"
              />
            )}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1" className="py-2">
          {get(TableData, "[0]", "") ? (
            <ReactTable
              // noDataText="No data found"
              minRows={TableData.length > 20 ? 1 : TableData.length}
              resizable={true}
              showPagination={false}
              defaultSorted={[
                {
                  id: "date",
                  desc: true
                }
              ]}
              columns={columns}
              data={TableData}
            />
          ) : !notes ? (
            <div style={{ width: "100%", height: 440 }}>
              <CustomSpinner />
            </div>
          ) : (
            <div className="w-100 text-center">No data found</div>
          )}
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotesTable);
