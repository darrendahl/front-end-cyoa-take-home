const DataAccessObject = require("./dataAccessObject");
const { faker } = require("@faker-js/faker");
const Comment = require("./comment");

const dataAccessObject = new DataAccessObject("./database.sqlite3");
const comment = new Comment(dataAccessObject);

const seedComments = async (num) => {
  for (let i = 0; i < num; i++) {
    const name = faker.person.fullName();
    const message = faker.lorem.paragraphs();
    await comment.createComment({ name, message });
  }
  console.log(`${num} comments created`);
};

seedComments(10)
  .then(() => dataAccessObject.db.close())
  .catch((err) => {
    console.error(err);
    dataAccessObject.db.close();
  });
