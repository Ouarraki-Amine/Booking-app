const mongoose = require('mongoose');

const placeShema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title:String,
    address:String,
    addedPhoto:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:String,
    checkOut:String,
    maxGuests:Number,
    maxChild:Number,
    maxBaby:Number,
    price:Number,
});

const PlaceModel = mongoose.model('Place',placeShema);
module.exports = PlaceModel;