import {DateTime} from 'luxon';

export function convertToLocalTimeZone(dateTimeString) {
  const gmtDateTime = new Date(dateTimeString + " +0000");
  return gmtDateTime.toLocaleString("en-US", { timeZone: "America/Chicago" });
}


export function convertToTimeZone(
  dateTimeString,
  targetTimeZone
) {
  if (!dateTimeString) {
    // If dateTimeString is null or undefined, return the current timestamp
    const currentDateTime = DateTime.now().setZone(targetTimeZone);
    return currentDateTime.toFormat("yyyy-MM-dd HH:mm:ss");
  }

  const gmtDateTime = DateTime.fromFormat(
    dateTimeString,
    "yyyy-MM-dd HH:mm:ss",
    { zone: "utc" }
  );
  const cdtDateTime = gmtDateTime.setZone(targetTimeZone);
  return cdtDateTime.toFormat("yyyy-MM-dd HH:mm:ss");
}



export function convertToUTC(
  dateTimeString,
  sourceTimeZone 
){
  const sourceDateTime = DateTime.fromISO(dateTimeString, {
    zone: sourceTimeZone,
  });
  const utcDateTime = sourceDateTime.toUTC();
  console.log("utc time is "+utcDateTime.toFormat("yyyy-MM-dd HH:mm:ss"));

  return utcDateTime.toFormat("yyyy-MM-dd HH:mm:ss");
}