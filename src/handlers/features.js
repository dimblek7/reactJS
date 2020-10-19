import fe_config from "constants/Configs";
import TokenManager from "utils/TokenManager";

const { CLIENT_ID_DEMO, CLIENT_ID_STORCENTRIC, MODE } = fe_config;
const clientId = TokenManager.getClientId();

/**
 * function name should be 'page_type_name'
 */
export function vendorlist_chart_paymentmix() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}
export function vendorlist_chart_paymentmethod() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}
export function payablelist_column_paymentmethod() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}
export function report_cashforecasting() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}
export function report_button_scenariomodeling() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}
export function report_button_reconcile() {
  return MODE === "DEV" || ![CLIENT_ID_STORCENTRIC].includes(clientId);
}
export function setting_link_arworkflow() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}
export function setting_receivables_arworkflow() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}
export function insights_ap_chart_paymenttermsbyvalue() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}
export function insights_ap_chart_paymenttermsaftermovetocard() {
  return MODE === "DEV" || TokenManager.getClientId() == CLIENT_ID_DEMO;
}

const features = {
  vendorlist_chart_paymentmix: vendorlist_chart_paymentmix(),
  vendorlist_chart_paymentmethod: vendorlist_chart_paymentmethod(),
  payablelist_column_paymentmethod: payablelist_column_paymentmethod(),
  report_cashforecasting: report_cashforecasting(),
  report_button_scenariomodeling: report_button_scenariomodeling(),
  report_button_reconcile: report_button_reconcile(),
  setting_link_arworkflow: setting_link_arworkflow(),
  setting_receivables_arworkflow: setting_receivables_arworkflow(),
  insights_ap_chart_paymenttermsbyvalue: insights_ap_chart_paymenttermsbyvalue(),
  insights_ap_chart_paymenttermsaftermovetocard: insights_ap_chart_paymenttermsaftermovetocard(),
}

//lets keep this log
console.log('Application features: ', features);

export default features;
