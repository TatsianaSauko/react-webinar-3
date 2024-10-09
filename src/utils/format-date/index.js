import moment from 'moment';
import 'moment/locale/ru';

export const formatDate = dateString => {
  return moment(dateString).locale('ru').format('D MMMM YYYY [в] HH:mm');
};
