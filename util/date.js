export function getNext7Dates(today) {
  const next7Dates = [];

  for (let i = 1; i <= 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    next7Dates.push(nextDate.toDateString());
  }

  return next7Dates;
}

export function getPrev7Dates(today) {
  const prev7Dates = [];

  for (let i = 1; i <= 7; i++) {
    const prevDate = new Date(today);
    prevDate.setDate(today.getDate() - i);
    prev7Dates.push(prevDate.toDateString());
  }

  return prev7Dates;
}

export function getFormattedDate(date) {
  return date.toDateString();
}


export function getNextNDates(today, n) {
  const nextNDates = [];

  for (let i = 1; i <= n; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    nextNDates.push(getFormattedDate(nextDate));
  }

  return nextNDates;
}

export function getPrevNDates(today, n) {
  const prevNDates = [];

  for (let i = 1; i <= n; i++) {
    const prevDate = new Date(today);
    prevDate.setDate(today.getDate() - i);
    prevNDates.push(getFormattedDate(prevDate));
  }

  return prevNDates;
}

export function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function countWeekendsInNextNDays(today, n) {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (isWeekend(date)) {
      count++;
    }
  }
  return count;
}

export function countWeekdaysInNextNDays(today, n) {
  let count = 0;
  for (let i = 1; i <= n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (!isWeekend(date)) {
      count++;
    }
  }
  return count;
}

export function getDayName(date) {
  const options = { weekday: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function getNextNWeekdays(today, n) {
  const nextNWeekdays = [];
  let count = 0;
  let i = 1;

  while (count < n) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    if (!isWeekend(nextDate)) {
      nextNWeekdays.push(getFormattedDate(nextDate));
      count++;
    }
    i++;
  }

  return nextNWeekdays;
}

export function getPrevNWeekdays(today, n) {
  const prevNWeekdays = [];
  let count = 0;
  let i = 1;

  while (count < n) {
    const prevDate = new Date(today);
    prevDate.setDate(today.getDate() - i);
    if (!isWeekend(prevDate)) {
      prevNWeekdays.push(getFormattedDate(prevDate));
      count++;
    }
    i++;
  }

  return prevNWeekdays;
}

const today = new Date();
console.log("Next 7 dates:", getNext7Dates(today));
console.log("Previous 7 dates:", getPrev7Dates(today));
console.log("Next 10 dates:", getNextNDates(today, 10));
console.log("Previous 10 dates:", getPrevNDates(today, 10));
console.log("Is today a weekend?", isWeekend(today));
console.log("Number of weekends in next 30 days:", countWeekendsInNextNDays(today, 30));
console.log("Number of weekdays in next 30 days:", countWeekdaysInNextNDays(today, 30));
console.log("Next 5 weekdays:", getNextNWeekdays(today, 5));
console.log("Previous 5 weekdays:", getPrevNWeekdays(today, 5));
console.log("Day name of today:", getDayName(today));
