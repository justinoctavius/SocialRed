const helpers = {};

helpers.randomName = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomName = '';
    for(let i = 0; i < 15; i++){
       randomName += possible.charAt(Math.floor((Math.random() * possible.length)));
    }
    return randomName;
}

module.exports = helpers;