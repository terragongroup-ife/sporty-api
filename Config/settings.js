const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise

const connectionUrl = "mongodb://sport:sport123@ds159025.mlab.com:59025/sport-quiz"
mongoose.connect(connectionUrl, {useNewUrlParser: true  })
.then(() => {
    console.log('Connected to MongoDB sucessfully')
})
.catch((err) => {
    console.log('Unable to connect to MongoDB')
    process.exit(1);
});

module.exports = mongoose;

