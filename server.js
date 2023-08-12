// Listening to Server
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB Connection is successful');
  });

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});

// const testTour = new Tour({
//   name: 'Park Camper',
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
