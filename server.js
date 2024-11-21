const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const musiciansRouter = require('./src/routes/musicians');

const app = express();

app.use(bodyParser.json());
app.use('/api/musicians', musiciansRouter);

mongoose.connect('mongodb://localhost:27017/musicianDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB: ', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
