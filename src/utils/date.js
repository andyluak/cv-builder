export const convertDateToReadable = (date) => {
  const dateArray = date.split("-");
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];

  const dateObject = new Date(year, month - 1, day);

  const monthName = dateObject.toLocaleString("default", { month: "long" });

  // return the date in the format day month year
  return `${day} ${monthName} ${year}`;
};
