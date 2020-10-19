import moment from "moment";

const Today = moment().format("MM/DD/YYYY");
const Yesterday = moment().subtract(1, "days").format("MM/DD/YYYY");
const Tomorrow = moment().add(1, "days").format("MM/DD/YYYY");

export const isinbetween = (date, startdate, enddate) => {
  const startdiff = betweenDays({ startdate, date });
  const enddiff = betweenDays({ date, enddate });
  return startdiff >= 0 && enddiff >= 0;
};

export const getThisFormatDate = (date, ip_format = "MM/DD/YYYY", op_format = "YYYY-MM-DD") => {
  if (date) {
    return moment(date, ip_format).format(op_format) === "Invalid date" ||
      moment(date, ip_format).format(op_format) === null ||
      moment(date, ip_format).format(op_format) === "null"
      ? ""
      : moment(date, ip_format).format(op_format);
  }
  return null;
};

export const getUTCDate = (date) => {
  if (date) {
    let io_format = "MM/DD/YYYY";
    return moment.utc(date).format(io_format) === "Invalid date" ||
      moment.utc(date).format(io_format) === null ||
      moment.utc(date).format(io_format) === "null"
      ? ""
      : moment.utc(date).format(io_format);
  }
  return null;
};

export const getFormattedDate = (date, ip_format = "YYYY-MM-DD") => {
  if (date) {
    let op_format = "MM/DD/YYYY";
    return moment(date).format(op_format) === "Invalid date" ||
      moment(date).format(op_format) === null ||
      moment(date).format(op_format) === "null"
      ? ""
      : moment(date, ip_format).format(op_format);
  }
  return null;
};

export function new_ts() {
  return moment().toDate().getTime();
}

export function ts_str({ ts, timeformat = "MM/DD/YYYY" }) {
  if (!ts) return "";
  return moment(ts).format(timeformat);
}

export function str_ts({ str, timeformat = "MM/DD/YYYY" }) {
  if (!str) return "";
  return moment(str, timeformat).toDate().getTime();
}

export function betweenDays({ startdate = moment(), enddate = moment() }) {
  enddate = moment.isMoment(enddate) ? enddate : moment(enddate);
  startdate = moment.isMoment(startdate) ? startdate : moment(startdate);
  const duration = moment.duration(enddate.diff(startdate));
  const res = duration.asDays();
  return parseInt(res);
}

export function getAllWeeksOfMonth(month) {
  month = moment().set("month", month).startOf("month");

  var first = month.day() === 0 ? 6 : month.day() - 1;
  var day = 7 - first;

  var last = month.daysInMonth();
  var count = (last - day) / 7;

  var weeks = [];
  weeks.push({ start: month.set("date", 1).format("MM/DD/YYYY"), end: month.set("date", day).format("MM/DD/YYYY") });
  for (var i = 0; i < count; i++) {
    weeks.push({
      start: month.set("date", day + 1).format("MM/DD/YYYY"),
      end: month.set("date", Math.min((day += 7), last)).format("MM/DD/YYYY"),
    });
  }
  return weeks;
}

export const dateExists = (date, start, end) => moment(date).isBetween(moment(start), moment(end), undefined, "[]");

export const getPastAndFutureDates = (startDate, endDate) => {
  let prev = betweenDays({ startdate: moment(startDate), enddate: moment(Yesterday) }) >= 0;
  let aft = betweenDays({ startdate: moment(Today), enddate: moment(endDate) }) >= 0;

  const getPastDates = () => {
    if (prev) {
      return [startDate, aft ? Yesterday : endDate];
    }
    return ["", ""];
  };

  const getFutureDates = () => {
    if (aft) {
      return [prev ? Today : startDate, endDate];
    }
    return ["", ""];
  };
  return [getPastDates(), getFutureDates()];
};

export function addBusinessDays(originalDate, numDaysToAdd) {
  const Sunday = 0;
  const Saturday = 6;
  let daysRemaining = numDaysToAdd;

  const newDate = originalDate.startOf('day').clone();

  while (daysRemaining > 0) {
    newDate.add(1, 'days');
    if (newDate.day() !== Sunday && newDate.day() !== Saturday) {
      daysRemaining--;
    }
  }

  return newDate;
}
