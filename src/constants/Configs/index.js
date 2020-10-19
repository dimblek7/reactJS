// eslint-disable-next-line no-unused-vars
import Production from "./PROD.json";
import Development from "./DEV.json";

// const fe_config = Production;
const fe_config = process.env.NODE_ENV === "PROD" ? Production : Development;
export default fe_config;
