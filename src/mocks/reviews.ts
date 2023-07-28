import { Review } from '../types/reviews';

export const reviews: Review[] = [
  {
    id: 'b041999e-e959-4452-aea1-06561bcd78e3',
    comment: 'I stayed here for one night and it was an unpleasant experience.',
    date: '2023-06-26T21:00:00.436Z',
    rating: 1,
    user: {
      name: 'Jack',
      avatarUrl: 'https://13.design.pages.academy/static/avatar/5.jpg',
      isPro: true,
    }
  },
  {
    id: '91ccc8f7-688a-4d9b-8998-a2f9713c1a6c',
    comment: 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: '2023-06-26T21:00:00.436Z',
    rating: 2,
    user: {
      name: 'Kendall',
      avatarUrl: 'https://13.design.pages.academy/static/avatar/10.jpg',
      isPro: false,
    }
  }
];
