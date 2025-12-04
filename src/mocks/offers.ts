import {OfferInfo} from '../types/offerInfo.ts';

export const offers: OfferInfo[] = [
  {
    id: 'e43c57b2-acd3-4d5a-b7e9-ab8f88a111fc',
    title: 'Beautiful & luxurious apartment at great location',
    description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
    type: 'hotel',
    price: 336,
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/2.jpg'
    ],
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    goods: [
      'Breakfast',
      'Washer',
      'Towels',
      'Wi-Fi',
      'Heating'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    isBookmark: true,
    isPremium: false,
    rating: 3.4,
    bedrooms: 5,
    maxAdults: 10
  },
  {
    id: '28e12dea-b2a0-4935-8f82-586646895338',
    title: 'The Pondhouse - A Magical Place',
    description: 'Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.',
    type: 'room',
    price: 289,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/13.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/18.jpg'
    ],
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16
    },
    goods: [
      'Cable TV',
      'Fridge',
      'Wi-Fi'
    ],
    host: {
      'isPro': true,
      'name': 'Angelina',
      'avatarUrl': 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    isBookmark: false,
    isPremium: true,
    rating: 1.7,
    bedrooms: 1,
    maxAdults: 3
  },
  {
    id: '5547d110-7ad0-435e-bd30-7a65b3317377',
    title: 'Amazing and Extremely Central Flat',
    description: 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
    type: 'apartment',
    price: 256,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/20.jpg',
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/17.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/18.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/14.jpg'
    ],
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16
    },
    goods: [
      'Fridge',
      'Kitchen',
      'Washer'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    isBookmark: false,
    isPremium: true,
    rating: 4.9,
    bedrooms: 3,
    maxAdults: 1
  },
  {
    id: 'b498129f-c380-47fb-9797-4a63a2541274',
    title: 'Waterfront with extraordinary view',
    description: 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
    type: 'house',
    price: 691,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/13.jpg',
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/19.jpg'
    ],
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.85761,
      longitude: 2.358499,
      zoom: 16
    },
    goods: [
      'Fridge',
      'Kitchen',
      'Dishwasher',
      'Wi-Fi'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    isBookmark: true,
    isPremium: false,
    rating: 3.3,
    bedrooms: 4,
    maxAdults: 8
  },

  {
    id: '118ef6e0-f299-4400-ae42-fc9a43056615',
    title: 'The Joshua Tree House',
    description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
    type: 'apartment',
    price: 216,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
    images: [
      'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/19.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/17.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://14.design.htmlacademy.pro/static/hotel/13.jpg'
    ],
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    location: {
      latitude: 50.950361,
      longitude: 6.961974,
      zoom: 16
    },
    goods: [
      'Breakfast',
      'Air conditioning',
      'Cable TV',
      'Heating',
      'Washing machine',
      'Towels',
      'Washer'
    ],
    host: {
      isPro: true,
      name: 'Angelina',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg'
    },
    isBookmark: false,
    isPremium: false,
    rating: 1.2,
    bedrooms: 3,
    maxAdults: 8
  },
];
