import React from "react";
import get from 'lodash/get';

export function getFormattedNumber(num = "", skiproundoff = true) {
  if (!num && num != 0) {
    return "";
  }
  let isnumfloat = num % 1 != 0;
  let result = isnumfloat ? Number(num).toFixed(1) : Math.round(num);
  if (skiproundoff) {
    result = Math.round(result);
  }
  result = Number.isNaN(result) ? 0 : result;
  // result = Math.abs(result);
  return Number(result).toLocaleString("en");
}

// Formatted Amount With Currency
export function getFAWC(num = "") {
  return !num && num !== 0 ? "" : <span>{getShortNumber(Math.round(num), true, false)}</span>;
  // style={{ fontFamily: "Roboto Mono" }}
}

export function kFormatter(num) {
  return Math.abs(num) > 99999
    ? getFormattedNumber(Math.abs(Math.sign(num) * (Math.abs(num) / 1000))) + "K"
    : getFormattedNumber(Math.abs(Math.sign(num) * Math.abs(num)));
}

export function mFormatter(num) {
  return Math.abs(num) > 999999
    ? getFormattedNumber((Math.sign(num) * (Math.abs(num) / 1000000)).toFixed(1), false) + "M"
    : getFormattedNumber(Math.sign(num) * Math.abs(num), false);
}

export function bFormatter(num) {
  return Math.abs(num) > 999999999
    ? getFormattedNumber((Math.sign(num) * (Math.abs(num) / 1000000000)).toFixed(1), false) + "B"
    : getFormattedNumber(Math.sign(num) * Math.abs(num), false);
}

export function getShortNumber(num, appendCurrency = true, toShort = true) {
  let round = Number(num);
  if (Number.isNaN(round) || (!num && num !== 0) || num === null) {
    return "";
  }
  const isnegative = round < 0;
  round = Number(Math.abs(num));
  if (toShort) {
    if (round > 999999999) {
      round = bFormatter(round);
    } else if (round > 999999) {
      round = mFormatter(round);
    } else if (round > 99999) {
      round = kFormatter(round);
    } else {
      round = getFormattedNumber(Math.round(round));
    }
  } else {
    round = getFormattedNumber(round);
  }
  const result = round || round === 0 ? (appendCurrency ? (isnegative ? `-$${round}` : `$${round}`) : round) : round;
  return result;
}

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const convertAmount = amount => {
  const isNegative = amount < 0;
  const roundAmount = Math.round(Math.abs(amount));
  if (isNegative) {
    return `-$${roundAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }
  return `$${roundAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const convertDecimalNo = (num) => {
  if(!num) {
    return 0;
  }else if(!Number.isInteger(Number(num))) {
    return Number(Number(num).toFixed(2));
  }
  return num;
}

export const getRoundedIntegerNo = (num) => {
  const _num = convertDecimalNo(num);
  return _num ? Math.round(_num) : 0;
}

export const isInvoiceClosed = (data) => {
  if (get(data, "date_closed", "")) {
    return true
  } else {
    return false
  }
}

export const paginationNextButtonStatus = (prev, next, rowCount, limit=20) => {
  // if there is no pagination flag provided then will use response array length count for that page.
  if(!next) {
    return rowCount < limit;
  } else if(next || prev) {
    return false;
  }
  return false;
}

export const percentageAmountGrowth = ((num, per) => convertDecimalNo((num / 100) * per));

export const percentageGrowthRate = (prevAmount, currAmount) => {
  const per = convertDecimalNo(((currAmount - prevAmount) / prevAmount) * 100);
  return isFinite(per) ? per : 0;
};

export const formatNumber = num => {
  if (num < 0) {
    return `-$${Math.abs(Math.round(num))
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  } else {
    return `$${Math.round(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }
};
