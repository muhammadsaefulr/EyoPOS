const timeZoneOffset = 7 * 60 * 60 * 1000; // Offset WIB (+7 jam dalam milidetik)

function formatDateToStr(date: Date){
   return new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
}

function getStartOfDay(date) {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return new Date(d.getTime() + timeZoneOffset);
  }
  
  function getEndOfDay(date) {
    const d = new Date(date);
    d.setUTCHours(23, 59, 59, 999);
    return new Date(d.getTime() + timeZoneOffset);
  }
  
  function getStartOfMonth(date) {
    const d = new Date(date);
    d.setUTCDate(1);
    d.setUTCHours(0, 0, 0, 0);
    return new Date(d.getTime() + timeZoneOffset);
  }
  
  function getEndOfMonth(date) {
    const d = new Date(date);
    d.setUTCMonth(d.getUTCMonth() + 1, 0);
    d.setUTCHours(23, 59, 59, 999);
    return new Date(d.getTime() + timeZoneOffset);
  }
  
  function getStartOfYear(date) {
    const d = new Date(date);
    d.setUTCMonth(0, 1);
    d.setUTCHours(0, 0, 0, 0);
    return new Date(d.getTime() + timeZoneOffset);
  }
  
  function getEndOfYear(date) {
    const d = new Date(date);
    d.setUTCMonth(11, 31);
    d.setUTCHours(23, 59, 59, 999);
    return new Date(d.getTime() + timeZoneOffset);
  }

  export {formatDateToStr, getStartOfDay, getEndOfDay, getStartOfMonth, getEndOfMonth, getStartOfYear, getEndOfYear}