import { Timestamp } from "firebase/firestore";

export const getDateAsString = (
  dateData: Date | Timestamp
) => {
  let date;
  if (typeof dateData == "object" && "nanoseconds" in dateData) {
    date = dateData.toDate();
  } else {
    date = new Date(dateData);
  }
  const _date = String(date.getUTCDate()).padStart(2, "0");
  const _month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const _year = date.getUTCFullYear();
  return `${_year}-${_month}-${_date}`;
};

export const getDateFromString = (date: string) => {
  return Date.parse(date);
};
