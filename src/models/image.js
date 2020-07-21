const mongoose = require('mongoose');
const path = require('path');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    title: String,
    description: String,
    filename: String,
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now}
});
ImageSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename), '')
    })


module.exports = mongoose.model('Image', ImageSchema)
