const timeZoneOffset = 7 * 60 * 60 * 1000; // Offset WIB (+7 jam dalam milidetik)

function formatDateToStr(date: Date){
   return new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${day} ${monthNames[date.getMonth()]}`
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

  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getUTCDay(); 
    const diff = day === 0 ? -6 : 1 - day; 
    d.setUTCDate(d.getUTCDate() + diff);
    d.setUTCHours(0, 0, 0, 0);
    return new Date(d.getTime() + timeZoneOffset);
  }

  function getEndOfWeek(date) {
      const d = new Date(date);
      const day = d.getUTCDay(); 
      const diff = day === 0 ? 0 : 7 - day; 

      d.setUTCDate(d.getUTCDate() + diff);
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

  export {formatDateToStr, formatDate, getStartOfDay, getEndOfDay, getStartOfWeek, getEndOfWeek, getStartOfMonth, getEndOfMonth, getStartOfYear, getEndOfYear}