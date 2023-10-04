import moment from 'moment';

export const momentFormat = (value: moment.Moment): string => {
  return moment(value).format('D MMMM');
};
