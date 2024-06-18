const express = require('express');
const mongodb = require('./data/database');
const app = express();  
const port = process.env.PORT || 8080;
const routes = require('./routes');
const users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

mongodb.initDb((err) => {
  if(err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {console.log(`Database is listening and node is running on localhost:${port}`)})
  }
});
  