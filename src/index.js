const express = require('express');
const config = require('./server/config')

//Database
require('./database')

const app = config(express())
app.listen(app.get('port'),() => console.log('Server on port', app.get('port')));