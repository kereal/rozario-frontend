let currCalendarDate = new Date(initDate);
let dayOfWeekList = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

function getDateList() {
  let dateList = [];
  let currDay = currCalendarDate.getDay();
  dateList.push(dayOfWeekList[currDay]);
  for (let i = 1; i < 3; i++) {
    if (currDay + i >= dayOfWeekList) {
      dateList.push(dayOfWeekList[i - 1]);
    } else {
      dateList.push(dayOfWeekList[currDay + i]);
    }
    if (currDay - i < 0) {
      dateList.unshift(dayOfWeekList[dayOfWeekList.length - i]);
    } else {
      dateList.unshift(dayOfWeekList[currDay - i]);
    }
  }
  return dateList;
}
