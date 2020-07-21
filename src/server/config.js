const path = require('path')
const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const express = require('express')
const morgan = require('morgan')
const multer = require('multer')

const routes = require('../routes/index')

const errorHandler = require('errorhandler')

module.exports = app => {
    
    //settings
    app.set('port', process.env.PORT || 3000)
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }))
    app.set('view engine', '.hbs');

    //middleware
    app.use(morgan('dev'))
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    
    //routes
    routes(app)   
    
    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')))

    //errorHandlers
    if('development' === app.get('env')){
        app.use(errorHandler)
    }

    return app
}