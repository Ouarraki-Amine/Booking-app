const mongoose = require('mongoose');

const ReservationShema = new mongoose.Schema({
    place_id:{type:mongoose.Schema.Types.ObjectId, ref:'Place'},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    checkIn:String,
    checkOut:String,
    nbOfGuests:Number,
    nbOfChild:Number,
    nbOfBaby:Number,
    nbOfNights:Number,
    price:Number,
    etat:String
});

const ReservationModel = mongoose.model('Reservation',ReservationShema);
module.exports = ReservationModel;