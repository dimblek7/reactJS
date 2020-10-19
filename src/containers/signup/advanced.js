import logo from "assets/images/logo.jpg";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { handleAPIError } from "handlers/setters";
import { instance, instanceMultipart } from "actions/axiosInstance";
import TokenManager from "utils/TokenManager";

export function Advanced(props) {
  const [postdata, setpostdata] = useState({});

  function update(e) {
    const { name, value } = e.target;
    setpostdata({ ...postdata, [name]: value });
  }

  function onSubmit() {
    // props.changeActiveIndex(2);
    const { company_type="", industry="", phone="", employee_size="", apspend="", erp_software="" } = postdata;
    const body =
      "<p>New registration,</p><ul>" +
      `<li>Company type: ${company_type}</li>` +
      `<li>Industry: ${industry}</li>` +
      `<li>Phone: ${phone}</li>` +
      `<li>Employees size: ${employee_size}</li>` +
      `<li>Monthly non-payroll AP spend: ${apspend}</li>` +
      `<li>ERP software: ${erp_software}</li>` +
      `</ul><p>Thanks,</p><p>${TokenManager.getUserName()}</p>`;

    const postData = { to: "admin@sinhagad.com", subject: "New company details", message: body };
    let bodyFormData = new FormData();
    bodyFormData.set("metadata", JSON.stringify(postData));

    instanceMultipart
      .post(`sendemail?supplier_id=1`, bodyFormData)
      .then(response => {
        props.changeActiveIndex(2);
      })
      .catch(err => {
        props.changeActiveIndex(2);
        handleAPIError(err);
      });
  }

  return (
    <div className="signup-container">
      <div className="logo">
        <img alt="loading" src={logo} height="60" width="60" />
        <span style={{ color: "white" }}> Sinhagad </span>
      </div>

      <div className="form-widget">
        <div className="inner-form-widget">
          <h3
            className="t-global text-center"
          >
            Tell us more about your company
          </h3>
          {/* <p className="t-global text-center">It's quick and easy</p> */}

          <form className="w-100 mt-3">
            <div className="col-md-12">
              <div className="form-group">
                <span>
                  <label>Company type</label>
                </span>
                <select name="company_type" onChange={update} className="form-control">
                  <option value="">Select</option>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <span>
                  <label>Industry</label>
                </span>
                <input type="text" name="industry" onChange={update} className="form-control" placeholder="Enter ..." />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <span>
                  <label>Phone</label>
                </span>
                <input type="text" name="phone" onChange={update} className="form-control" placeholder="Enter ..." />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <span>
                  <label>Employees size</label>
                </span>

                <select name="employee_size" onChange={update} className="form-control">
                  <option value="">Select</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-200">101-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <span>
                  <label>Monthly non-payroll AP spend</label>
                </span>
                <select name="apspend" onChange={update} className="form-control">
                  <option value="">Select one</option>
                  <option value="$0 - $5,000">$0 - $5,000</option>
                  <option value="$5,001 - $10,000">$5,001 - $10,000</option>
                  <option value="$10,001 - $20,000">$10,001 - $20,000</option>
                  <option value="$20,001 - $50,000">$20,001 - $50,000</option>
                  <option value="$50,001 - $200,000">$50,001 - $200,000</option>
                  <option value="$200,001 - $500,000">$200,001 - $500,000</option>
                  <option value="$500,001+">$500,001+</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <span>
                  <label>ERP software</label>
                </span>
                <select name="erp_software" onChange={update} className="form-control">
                  <option value="">Select one</option>
                  <option value="NetSuite">NetSuite</option>
                  <option value="QuickBooks Online">QuickBooks Online</option>
                  <option value="QuickBooks Desktop Pro / Enterprise">QuickBooks Desktop Pro / Enterprise</option>
                  <option value="Sage Intacct">Sage Intacct</option>
                  <option value="SAP Cloud ERP">SAP Cloud ERP</option>
                  <option value="Xero">Xero</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="col-md-12">
              <div className="w-100 text-right">
                <Button
                  className="mt-3 mr-3 pull-left width-94px"
                  variant="secondary"
                  onClick={() => {
                    props.changeActiveIndex(2);
                  }}
                >
                  Skip
                </Button>
                <Button className="mt-3 width-94px" variant="primary" onClick={onSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Advanced;
