const mongoose = require('mongoose');
const {database} = require('./keys')

mongoose.connect(database.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => console.log('DB connected'))
    .catch(err => console.log(err))