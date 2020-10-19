import Tooltip from "@material-ui/core/Tooltip";
import { ux_istrue } from "handlers/ux";
import get from "lodash/get";
import React from "react";
import { Accordion, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

const NAV = [
  {
    name: "Dashboard",
    ilink: "fas fa-tachometer-alt mr-3",
    route: "/dashboard",
    localStorageKey: "dashboardrange",
    subStorages: [],
  },
  { name: "Cash Flow", ilink: "fntw fas fa-list mr-3", route: "/reports", localStorageKey: "", subStorages: [] },
  {
    name: "Payroll",
    ilink: "fntw fas fa-money mr-3",
    route: "/payroll",
    localStorageKey: "payrollFilters",
    subStorages: [],
  },
  {
    name: "Payables",
    ilink: "fntw fas fa-file-invoice-dollar mr-3",
    route: "/payables",
    localStorageKey: "payableFilters",
    subStorages: [],
    subNav: [
      {
        name: "Purchase Orders",
        ilink: "fntw fas fa-file-invoice-dollar mr-3",
        route: "/purchase-orders",
        localStorageKey: "payablePurchaseOrderFilters",
        subStorages: [],
      },
      {
        name: "Non Invoiced Exp",
        ilink: "fntw fas fa-file-invoice-dollar mr-3",
        route: "/non-invoiced-expenses",
        localStorageKey: "payableNonInvoicedExpensesFilters",
        subStorages: [],
      }
    ],
  },
  {
    name: "Receivables",
    ilink: "fas fa-hand-holding-usd mr-3",
    route: "/receivables",
    localStorageKey: "receivableFilters",
    subStorages: [],
    subNav: [
      {
        name: "Order Backlog",
        ilink: "fas fa-hand-holding-usd mr-3",
        route: "/backlog",
        localStorageKey: "backlogFilters",
        subStorages: [],
      },
    ],
  },
  {
    name: "Vendors",
    ilink: "fas fa-user-tag mr-3",
    route: "/vendors",
    localStorageKey: "vendorsFilters",
    subStorages: ["vendor_activeTab", "activeTabSelection"],
  },
  {
    name: "Customers",
    ilink: "fas fa-users mr-3",
    route: "/customers",
    localStorageKey: "customersFilters",
    subStorages: ["customer_activeTab", "customer_details_activeTab", "activeTabSelection"],
  },
  { name: "Insights", ilink: "fntw fas fa-chart-line mr-3", route: "/insights", localStorageKey: "", subStorages: [] },
  { name: "Settings", ilink: "fas fa-cog mr-3", route: "/settings", localStorageKey: "", subStorages: [] },
];

export const LeftNav = (props) => {
  const { ux, history } = props;
  const openleftnav = ux_istrue(ux.NAVIGATION_PANEL_EXPANDED);

  React.useEffect(() => {
    let currentPage = get(window, "location.pathname", "").split("/");
    console.log('currentPageArray: ', currentPage);
  }, []);

  function clearOtherLocalStorages(currentlocalStorageKey) {
    NAV.forEach((element) => {
      if (element.localStorageKey !== currentlocalStorageKey) {
        element.subStorages.forEach((storeKey) => {
          localStorage.removeItem(storeKey);
        })
        localStorage.removeItem(element.localStorageKey);
      }
    });
  }

  return (
    <div id="sidebar-container" className={openleftnav ? "sidebar-expanded" : "sidebar-collapsed"}>
      <div className="list-group sidebarfixed non-sticky-header-container">
        {NAV.map((element, i) => (
          <div>
            <Accordion
              className="bg-light-grey"
              defaultActiveKey={
                element.subNav &&
                element.subNav.filter((el) => get(history, "location.pathname", "").includes(el.route)).length !== 0
                  ? i
                  : null
              }
            >
              <Accordion.Toggle
                className="m-0 p-0 bg-light-grey border-0"
                // className="border mt-4 px-3 cursour-pointer bg-light-grey"
                as={Card.Header}
                eventKey={i}
              >
                <NavLink
                  key={element.name}
                  to={element.route}
                  activeClassName="activet"
                  onClick={(e) => {
                    if (element.isdisabled || get(history, "location.pathname", "") === element.route) {
                      e.preventDefault();
                      localStorage.removeItem(element.localStorageKey);
                      element.subStorages.forEach((storeKey) => {
                        localStorage.removeItem(storeKey);  
                      });
                      history.push('/');
                      history.push(element.route);
                    } else {
                      clearOtherLocalStorages(element.localStorageKey);
                    }
                  }}
                  className={`list-group-item list-group-item-action flex-column align-items-start, ${
                    element.isdisabled ? "cursour-not-allowed text-secondary" : ""
                  }`}
                >
                  <div className="d-flex w-100 justify-content-start align-items-center">
                    <Tooltip title={element.name} placement="right">
                      <i
                        style={{ width: "15px" }}
                        className={element.ilink}
                        data-toggle="tooltip"
                        data-placement="right"
                      ></i>
                    </Tooltip>
                    <span className={openleftnav ? "menu-collapsed" : "menu-collapsed d-none"}>{element.name}</span>
                  </div>
                </NavLink>
              </Accordion.Toggle>
              <Accordion.Collapse className="m-0 p-0" eventKey={i}>
                <div>
                  {element.subNav ? (
                    <div className={`subnav ${openleftnav ? "ml-4" : ""}`}>
                      {element.subNav.map((el) => (
                        <NavLink
                          key={el.name}
                          to={el.route}
                          activeClassName="activet"
                          onClick={(e) => {
                            if (el.isdisabled || get(history, "location.pathname", "") === el.route) {
                              e.preventDefault();
                              localStorage.removeItem(el.localStorageKey);
                              el.subStorages.forEach((storeKey) => {
                                localStorage.removeItem(storeKey);  
                              });
                              history.push('/');
                              history.push(el.route);
                            } else {
                              clearOtherLocalStorages(el.localStorageKey);
                            }
                          }}
                          className={`list-group-item list-group-item-action flex-column align-items-start ${
                            el.isdisabled ? "cursour-not-allowed text-secondary" : ""
                          }`}
                        >
                          <div className="d-flex w-100 justify-content-start align-items-center">
                            <Tooltip title={el.name} placement="right">
                              <i
                                style={{ width: "15px" }}
                                className={el.ilink}
                                data-toggle="tooltip"
                                data-placement="right"
                              ></i>
                            </Tooltip>
                            <span className={openleftnav ? "menu-collapsed" : "menu-collapsed d-none"}>{el.name}</span>
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Accordion.Collapse>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ux: state.ux,
});

export default withRouter(connect(mapStateToProps, null)(LeftNav));
