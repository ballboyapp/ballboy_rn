import { MockList } from 'graphql-tools';
import faker from 'faker';
import { SPORTS, ACTIVITY_STATUSES } from '../constants';

const mocks = {
  Query: () => ({
    spots: () => new MockList([3, 5]),
    activities: () => new MockList([10, 15]),
  }),
  UserProfile: () => ({
    avatar: 'https://cdn.pixabay.com/photo/2016/04/15/20/28/football-1331838_1280.jpg',
  }),
  Activity: () => ({
    attendeesIds: () => new MockList(5),
    attendees: () => new MockList(5),
    isOrganizer: true,
    status: ACTIVITY_STATUSES.ACTIVE,
  }),
  Spot: () => ({
    images: [
      'https://cdn.pixabay.com/photo/2016/04/15/20/28/football-1331838_1280.jpg'
    ],
    sports: Object.values(SPORTS),
  }),
  Date: () => {
    const d = new Date();
    return d.toISOString();
  },
};

export default mocks;


// import { MockList } from 'graphql-tools/dist/index';
// import faker from 'faker';

// const mocks = {
//   Query: () => ({
//     spots: () => new MockList([3, 5]),
//     games: () => new MockList([20, 50]),
//     sports: () => new MockList([5, 10]),
//   }),
//   SpotImageType: () => ({
//     image: [
//       'https://cdn.pixabay.com/photo/2016/04/15/20/28/football-1331838_1280.jpg',
//       'https://www.maxpixel.net/static/photo/640/Sport-Bicycle-Road-Riding-Recreation-Cycling-655565.jpg',
//     ][faker.random.number(1)],
//   }),
//   SportType: () => ({
//     uuid: faker.random.uuid,
//     name: () => faker.lorem.words(2),
//   }),
//   SpotType: () => ({
//     uuid: faker.random.uuid,
//     name: () => faker.lorem.words(2),
//     capacity: () => faker.random.number(20),
//   }),
//   GameType: () => ({
//     uuid: faker.random.uuid,
//     attendees: () => new MockList([1, 20]),
//     share_link: () => 'https://example.share.link/12345',
//   }),
//   UserType: () => ({
//     uuid: faker.random.uuid,
//     name: () => faker.lorem.words(2),
//   }),
//   JSONString: () => ({
//     lighting: true,
//     size: 54,
//   }),
//   DateTime: () => {
//     const d = new Date();
//     d.setDate(d.getDate() + faker.random.number(30));
//     return d;
//   },
//   CustomDateTime: () => {
//     const d = new Date();
//     d.setDate(d.getDate() + faker.random.number(30));
//     return d;
//   },
//   UUID: faker.random.uuid,
// };

// export default mocks;
