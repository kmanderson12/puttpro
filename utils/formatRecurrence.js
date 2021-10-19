import convertDay from '../utils/convertDay';

//TODO: Add better handling of dayOfWeek (if not selected)

const formatRecurrence = (recurrence, dayOfWeek, dayOfMonth, customDay) => {
  switch (recurrence) {
    case 'monthly':
      return `Every month on the ${
        dayOfMonth === 'custom'
          ? customDay === ''
            ? '...'
            : convertDay(customDay)
          : convertDay(dayOfMonth)
      }`;
    case 'bi-weekly':
      return `Every 2 weeks on ${dayOfWeek}s`;
    case 'weekly':
      return `Every week on ${dayOfWeek}`;
    default:
      return new Error(`An invalid recurrence was provided.`);
  }
};

export default formatRecurrence;
