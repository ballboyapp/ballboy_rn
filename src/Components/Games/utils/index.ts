// import { RESPONDENT_STATUSES } from '../../../constants';

// export const getAttendees = respondents => (
//   (respondents && respondents.length > 0)
//     ? respondents.filter(r => r.status === RESPONDENT_STATUSES.ATTENDING)
//     : []
// );

// export const getAttendees = attendees => (
//   (attendees && attendees.length > 0)
//     ? attendees.filter(rsvp => rsvp.status === 'ATTENDING') // .map(rsvp => rsvp.user)
//     : []
// );

// eslint-disable-next-line
export const mapMax = (maxNum, data, fn, fnElse) => {
  if (maxNum >= data.length) return data.map(fn);

  const returnArr = data.slice(0, maxNum - 1).map(fn);
  returnArr.push(fnElse());
  return returnArr;
};
