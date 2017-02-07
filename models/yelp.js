var mongoose = require('mongoose');

var YelpSchema = new mongoose.Schema({
    restaurantid:{type:String,default:"noidgiven"},
    usernames:{type:Array,default:[]}
 
});

module.exports = mongoose.model('YelpSchema', YelpSchema);