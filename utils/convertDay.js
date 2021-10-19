import ordinal from 'ordinal';

const convertDay = (dayOfMonth, customDay) => {
  switch (dayOfMonth) {
    case 'first':
      return '1st';
    case 'last':
      return 'last day';
    case 'custom':
      return ordinal(parseInt(customDay));
    default:
      return ordinal(parseInt(dayOfMonth));
  }
};

export default convertDay;
