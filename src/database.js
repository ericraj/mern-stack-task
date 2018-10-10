const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost/mern-stack-tasks';

mongoose.connect(DB_URI, { useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;