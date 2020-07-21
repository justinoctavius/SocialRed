const { Comment, Image } = require('../models')

module.exports = {
    async newest() {
        const comments = await Comment.find()
            .limit(5)
            .sort({timeStamp: -1})
        
        for (const comment of comments){
            comment.images =  await Image.findOne({ _id: comment.imageId});
        }
        return comments;
    }
}