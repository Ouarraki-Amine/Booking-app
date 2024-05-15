import  axios  from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import { differenceInCalendarDays } from "date-fns";


const BookingPage = () => {
    const {id} = useParams();
    const currentDate = new Date();
    let nbOfNights;
    const [booking,setBooking]=useState(null);
    useEffect(()=>{
        if(id){
            axios.get('/reservation').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id)
                if(foundBooking){
                    setBooking(foundBooking);
                    
                }
            })
        }
    },[id])
    if(!booking){
        return '';
    }
    if(booking){
        nbOfNights = differenceInCalendarDays( new Date(booking.checkIn),new Date(currentDate))
    }
    
    return ( 
        <>
            <div className="my-8">
                <h1 className="text-3xl">{booking.place_id.title}</h1>
                <AddressLink place={booking.place_id} />
                <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                    <h2 className="text-xl">Your booking information:</h2>
                    <BookingDates booking={booking}/>
                   
                    {console.log(nbOfNights)}
                    <button disabled={nbOfNights<=1} className="primary">Annuler</button>
                </div>
                <PlaceGallery place={booking.place_id} />
            </div>
        </>
     );
}
 
export default BookingPage;