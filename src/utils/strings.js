import get from "lodash/get";

export const getValueFromUrl = (_url, _key) => _url
  ? get(
    _url
      .split("&")
      .filter((x) => x)
      .map((x) => x.split("="))
      .find((param) => [_key].includes(param[0])),
    "[1]",
    ""
  ) : ""

export const deleteValuesFromURL = (_url, _keys) => _url ?
  _url
    .split("&")
    .filter((x) => x)
    .map((x) => x.split("="))
    .filter((param) => !_keys.includes(param[0]))
    .map((x) => x.join("="))
    .join("&") : ""
