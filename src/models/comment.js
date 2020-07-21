const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const CommentSchema = new Schema({
    imageId: {type: ObjectId},
    email: {type: String},
    name: {type: String},
    gravatar: {type: String},
    comment: {type: String},
    timeStamp: {type: Date, default: Date.now}
});

CommentSchema.virtual('image')
    .set( (image) => {
        this._image = image;
    })
    .get( () => this._image);

module.exports = model('Comment', CommentSchema);