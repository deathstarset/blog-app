export const getDate = (date: Date) => {
  const my_date = new Date(date);
  const month = my_date.getMonth() + 1;
  const day = my_date.getDay();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedDate = `${formattedMonth}-${formattedDay}`;
  return formattedDate;
};
