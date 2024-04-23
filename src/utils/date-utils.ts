export const getDateAsString = (date: Date) => {
  const _date = String(date.getUTCDate()).padStart(2,'0');
  const _month = String(date.getUTCMonth()+1).padStart(2,'0');
  const _year = date.getUTCFullYear();
  return `${_year}-${_month}-${_date}`
};

export const getDateFromString = (date: string) => {
  return Date.parse(date);
};
