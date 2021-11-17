const initialState = {
  items: [
    {
      id: 1,
      date: '2021-10-25T17:17:02.264Z',
      puttLog: [
        { distance: 20, makes: 8, attempts: 10 },
        { distance: 15, makes: 9, attempts: 10 },
        { distance: 10, makes: 9, attempts: 10 },
        { distance: 25, makes: 9, attempts: 10 },
        { distance: 35, makes: 4, attempts: 10 },
        { distance: 45, makes: 3, attempts: 10 },
        { distance: 50, makes: 7, attempts: 10 },
        { distance: 60, makes: 1, attempts: 10 },
      ],
      notes: 'Working on my full range.',
      c1Stats: { makes: 35, attempts: 40, percent: 88 },
      c2Stats: { makes: 15, attempts: 40, percent: 38 },
    },
    {
      id: 2,
      date: '2021-10-21T14:59:24.772Z',
      puttLog: [
        { distance: 15, makes: 8, attempts: 10 },
        { distance: 15, makes: 9, attempts: 10 },
        { distance: 15, makes: 8, attempts: 10 },
      ],
      notes: 'Getting a good release with the Aviar.',
      c1Stats: { makes: 25, attempts: 30, percent: 83 },
      c2Stats: { makes: 0, attempts: 0, percent: 0 },
    },
    {
      id: 3,
      date: '2021-10-20T14:59:24.772Z',
      puttLog: [
        { distance: 15, makes: 9, attempts: 10 },
        { distance: 15, makes: 8, attempts: 10 },
        { distance: 15, makes: 10, attempts: 10 },
        { distance: 15, makes: 10, attempts: 10 },
      ],
      notes: 'Use your legs.',
      c1Stats: { makes: 37, attempts: 40, percent: 93 },
      c2Stats: { makes: 0, attempts: 0, percent: 0 },
    },
    {
      id: 4,
      date: '2021-10-19T14:59:24.772Z',
      puttLog: [
        { distance: '15', makes: '8', attempts: '10' },
        { distance: '15', makes: '9', attempts: '10' },
        { distance: '15', makes: '8', attempts: '10' },
        { distance: '15', makes: '8', attempts: '10' },
      ],
      notes: 'Focus on a single chain link.',
      c1Stats: { makes: 33, attempts: 40, percent: 83 },
      c2Stats: { makes: 0, attempts: 0, percent: 0 },
    },
    {
      id: 5,
      date: '2021-10-18T14:59:24.772Z',
      puttLog: [
        { distance: '15', makes: '8', attempts: '10' },
        { distance: '15', makes: '9', attempts: '10' },
        { distance: '15', makes: '8', attempts: '10' },
        { distance: '15', makes: '8', attempts: '10' },
      ],
      notes: 'Shake hands with the basket.',
      c1Stats: { makes: 33, attempts: 40, percent: 83 },
      c2Stats: { makes: 0, attempts: 0, percent: 0 },
    },
  ],
};

export default initialState;
