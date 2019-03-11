const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise

// const connectionUrl = 'mongodb://abassade:makinde123@ds159840.mlab.com:59840/sporty'

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true  })
.then(() => {
    console.log('Connected to MongoDB sucessfully')
})
.catch((err) => {
    console.log('Unable to connect to MongoDB')
    process.exit(1);
});

module.exports = mongoose;

