const path = require('path');
const helpers = require('../helpers/libs');
const fs = require('fs-extra');
const md5 = require('md5')
const { Image, Comment } = require('../models');
const sidebar = require('../helpers/sidebar');

const ctrl = {};

ctrl.index = async (req, res) => {
    let viewModel = { image: {}, comments: {}};
    
    const param = req.params.imageId;
    const image = await Image.findOne({filename: {$regex: param}});
    if(image){
        image.views = image.views + 1;
        await image.save();
        viewModel.image = image;
        const comments = await Comment.find({imageId: image._id});
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        res.render('image', viewModel);
    
    }else{
        res.redirect('/');
    }
};

ctrl.create = (req, res) => {
    const saveImage = async () => {
        const randomName = helpers.randomName();
        const images = await Image.find({filename: randomName});
        if(images.length > 0){
            saveImage();
        }else{
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${randomName}${ext}`)
        
            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                await fs.rename(imageTempPath, targetPath);

                const newImg = new Image({
                   title: req.body.title,
                   filename: randomName + ext,
                   description: req.body.description, 
                });

                const imageSaved = await newImg.save()
                console.log(imageSaved)
                res.redirect('/images/' + randomName)
            }else{
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'invalid file, only images are allowed'});
            }

        }
    }
    saveImage();
}

ctrl.like = async(req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.imageId}})
    if(image){
        image.likes = image.likes + 1;
        await image.save()
        res.json({likes: image.likes})
    }else{
        res.status(500)
            .json(({error: 'Image not found'}))
    }
};

ctrl.comment = async(req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.imageId}});
    if(image){
        const newComment = await new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.imageId = image._id;
        await newComment.save();
        res.redirect('/images/' + image.uniqueId);
    }else{
        res.redirect('/');
    }
};

ctrl.remove = async(req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.imageId}});
    if(image){
        await fs.unlink(path.resolve(__dirname, '..', 'public', 'upload', image.filename));
        await Comment.deleteMany({imageId: image._id})
        await image.remove();
        res.json(true)
    }else{
        res.status(500)
            .json(({error: 'Image not found'}))
    }
}

module.exports = ctrl