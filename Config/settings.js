const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true  })
.then(() => {
    console.log('Connected to MongoDB sucessfully')
})
.catch((err) => {
    console.log('Unable to connect to MongoDB', err)
    process.exit(1);
});

module.exports = mongoose;