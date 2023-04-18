const faker = require('faker');

const getRandomBook = () => {
  const book = {
    id: faker.datatype.number({ min: 1 }),
    title: faker.lorem.words(3),
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    isbn: `${faker.datatype.number({ min: 1000000000, max: 9999999999 })}`,
    publicationDate: faker.date.past(50).toISOString(),
    genre: faker.random.arrayElement([
      'Fiction',
      'Non-fiction',
      'Sci-fi',
      'Biography',
      'History',
    ]),
    createdAt: faker.date.past(1).toISOString(),
    updatedAt: faker.date.recent(30).toISOString(),
  };
  return book;
};

const getRandomUser = () => {
  const user = {
    id: faker.datatype.number({ min: 1 }),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(8),
    createdAt: faker.date.past(1).toISOString(),
    updatedAt: faker.date.recent(30).toISOString(),
  };
  return user;
};

module.exports = {
  getRandomBook,
  getRandomUser,
};
