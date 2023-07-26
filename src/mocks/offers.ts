import { Offer, OfferCard } from '../types/offer';

export const offers: Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3740300,
        longitude: 4.8896900,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    previewImage: 'https://13.design.pages.academy/static/hotel/14.jpg',
  },
  {
    id: 'e3274362-f06e-4870-ab15-a08b9163ea63',
    title: 'Canal View Prinsengracht',
    type: 'hotel',
    price: 203,
    previewImage: 'https://13.design.pages.academy/static/hotel/12.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3740300,
        longitude: 4.8896900,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 2.6,
  },
  {
    id: '6de1df75-3659-4aad-8d09-c076d19b49fe',
    title: 'The house among olive ',
    type: 'apartment',
    price: 348,
    previewImage: 'https://13.design.pages.academy/static/hotel/17.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3740300,
        longitude: 4.8896900,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 2.8,
  },
  {
    id: 'e360a8c2-9f6e-464d-afa5-74c5bb5b5c84',
    title: 'Amazing and Extremely Central Flat',
    type: 'room',
    price: 174,
    previewImage: 'https://13.design.pages.academy/static/hotel/6.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3740300,
        longitude: 4.8896900,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 3.2,
  },
];

export const offerFullCard: OfferCard = {
  id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8,
  },
  isFavorite: false,
  isPremium: false,
  rating: 4,
  description:
    'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
  bedrooms: 3,
  goods: [
    'Washing machine',
    'Cable TV',
    'Air conditioning'
  ],
  host: {
    name: 'Oliver Conner',
    avatarUrl: 'https://url-to-image/image.png',
    isPro: false,
  },
  images: [
    'https://13.design.pages.academy/static/hotel/8.jpg',
    'https://13.design.pages.academy/static/hotel/16.jpg',
    'https://13.design.pages.academy/static/hotel/3.jpg',
    'https://13.design.pages.academy/static/hotel/19.jpg',
    'https://13.design.pages.academy/static/hotel/12.jpg',
    'https://13.design.pages.academy/static/hotel/15.jpg'
  ],
  maxAdults: 4,
};
