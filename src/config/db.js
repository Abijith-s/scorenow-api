const mongoose = require('mongoose');
const dbConnect = (url) =>{
    mongoose.connect(url).then(()=>{
        console.log('database connected successfully');
    }).catch((err)=>{
        console.log(`database not connected ${err}`);
    })
}

module.exports = {
    dbConnect
};