const CIRCLE_RANGES = {
  CIRCLE_1: {
    name: 'C1',
    min: 0,
    max: 33,
  },
  CIRCLE_2: {
    name: 'C2',
    min: 33,
    max: 66,
  },
};

const circleRange = [
  {
    range: 'c1Short',
    min: 0,
    max: 11,
  },
  {
    range: 'c1Medium',
    min: 11,
    max: 22,
  },
  {
    range: 'c1Long',
    min: 22,
    max: 33,
  },
  {
    range: 'c2Short',
    min: 33,
    max: 44,
  },
  {
    range: 'c2Medium',
    min: 44,
    max: 55,
  },
  {
    range: 'c2Long',
    min: 55,
    max: 66,
  },
];

export { CIRCLE_RANGES, circleRange };
