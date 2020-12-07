const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./helpers/error');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(errorHandler);

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});