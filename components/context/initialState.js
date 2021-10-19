const initialState = {
  name: 'Dewey Finn',
  email: 'dewey@schoolofrock.com',
  items: [
    {
      id: 1,
      type: `income`,
      title: `Substitute Teaching`,
      recurrence: `bi-weekly`,
      amount: `1000`,
      dayOfMonth: `first`,
      dayOfWeek: `Friday`,
      customDay: 15
    },
    {
      id: 2,
      type: `income`,
      title: `Gig Money`,
      recurrence: `weekly`,
      amount: `150`,
      dayOfMonth: `first`,
      dayOfWeek: `Friday`,
      customDay: 15
    },
    {
      id: 3,
      type: `expense`,
      title: `Guitar Strings`,
      recurrence: `monthly`,
      amount: `20`,
      dayOfMonth: `first`,
      dayOfWeek: `Monday`,
      customDay: 15
    },
    {
      id: 4,
      type: `expense`,
      title: `Gas for Van`,
      recurrence: `weekly`,
      amount: `40`,
      dayOfMonth: `first`,
      dayOfWeek: `Monday`,
      customDay: 15
    },
    {
      id: 5,
      type: `expense`,
      title: `Spotify`,
      recurrence: `monthly`,
      amount: `11`,
      dayOfMonth: `custom`,
      dayOfWeek: `Monday`,
      customDay: 20
    }
  ]
};

export default initialState;
