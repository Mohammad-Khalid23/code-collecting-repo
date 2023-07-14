const moment = require('moment');
const _ = require("lodash");
// e.g daysBetweenDataRange('2023-07-10','2023-08-10',[0,1,2,3,4,5,6]);
const daysBetweenDataRange = (start, end, weekdays) => {
  let days = [], d = moment(start).startOf('day');

  if (!_.isNil(weekdays)) {
    if (!_.isArray(weekdays)) { weekdays = [weekdays]; }

    for (let w = 0; w < weekdays.length; w++) {
      weekdays[w] = moment(start).day(weekdays[w]).day();
    }
  } else {
    weekdays = [0, 1, 2, 3, 4, 5, 6];
  }

  for (let i = 0; i < (moment(end).endOf('day').diff(moment(start), 'days') + 1); i++) {
    let wd = d.day();

    if (weekdays.indexOf(wd) !== -1) {
      days.push(moment(d));
    }

    d.add(1, 'day');
  }

  days = days
    .sort((a, b) => { return moment.utc(a).diff(moment.utc(b)); })
    .filter((o, p, a) => { return (o != null && !o.isSame(a[p - 1])); });

  if (!days.length) { return false; }
  if (days.length === 1) { return days[0]; }

  return days;
};


const getTimeDifferenceInHours = (time) => {
    const end = moment(new Date(time));
    const now = moment(new Date()); //todays date
    const duration = moment.duration(now.diff(end));
    const hours = duration.asHours();
    return Math.ceil(hours.toFixed(2));
}
