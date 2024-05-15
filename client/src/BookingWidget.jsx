import { useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays, addDays, format  } from 'date-fns';
import { Link,useLocation, Navigate} from "react-router-dom";



const BookingWidget = ({place}) => {
    const [redirectOut,setRedirectOut]=useState(false);
    const [redirect,setRedirect]=useState(false);
    const [checkIn,setCheckIn]=useState('');
    const[checkOut,setCheckOut]=useState('');
    const[nbOfGuests,setNbOfGuests]=useState(1);
    const[nbOfChild,setnbOfChild]=useState(0);
    const[nbOfBaby,setNbOfBaby]=useState(0);
    const location = useLocation();
    let price = 0;
    let nbOfNights = 0;
    const etat = 'en cours';
     
    if(checkIn && checkOut){
        nbOfNights = differenceInCalendarDays( new Date(checkOut),new Date(checkIn)) 
    } 
    const place_id = location.pathname.split('/')[2];

    const handleReservation = async()=>{
        try{
            const response = await axios.post('/reserve', {place_id,checkIn,checkOut,nbOfGuests,nbOfChild,nbOfBaby,nbOfNights,price,etat});
            const bookingId = response.data._id;
            setRedirect(bookingId);

        }catch(e){
            setRedirectOut(true)
        }
    }
   

   

    const handleIncrement = (p) => {
        switch(p.target.id) {
            case 'guests':
              setNbOfGuests(nbOfGuests + 1)
              break;
            case 'child':
              setnbOfChild(nbOfChild + 1)
              break;
            case 'baby':
              setNbOfBaby(nbOfBaby + 1);
              break;
            default:
        }
    };
  
    const handleDecrement = (p) => {
        switch(p.target.id) {
            case 'guests1':
              setNbOfGuests(nbOfGuests - 1)
              break;
            case 'child1':
              setnbOfChild(nbOfChild - 1)
              break;
            case 'baby1':
              setNbOfBaby(nbOfBaby - 1);
              break;
            default:
        }
    };
       
    
    return ( 
        <>
            {redirect && <Navigate to={"/account/bookings/"+redirect}/>}
            {redirectOut &&  <Navigate to={"/login"}/> } 
            <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                    {place.price} $ per night
                </div>
                <div className="border p-2 rounded-2xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4">
                            <label>Check in</label>
                            <input type="date" className="focus:outline-none" 
                                   value={checkIn} 
                                   onChange={e=>setCheckIn(e.target.value)} 
                                   min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="py-3 px-4 border-l">
                            <label>Check Out</label>
                            <input type="date" className="focus:outline-none"
                                   value={checkOut} 
                                   onChange={e=>setCheckOut(e.target.value)}  
                                   min={checkIn ? format(addDays(new Date(checkIn), 1), 'yyyy-MM-dd') : ''} disabled={!checkIn} 
                            />
                        </div>
                        
                     
                    </div>
                    <div className="flex border-y"></div>
                    <div className="flex px-2 py-2 items-center justify-between">
                        <div className="flex">Adultes</div>
                        <div className="flex gap-3">
                            
                            <button
                            id="guests1"  
                            disabled={nbOfGuests==1} 
                            onClick={e=>handleDecrement(e)}
                            className="px-3 py-2 ml-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                            >
                                -
                            </button>
                            <div className="py-2" >
                                {nbOfGuests}
                            </div>
                            <button
                            id="guests" 
                            disabled={nbOfGuests==place.maxGuests} 
                            onClick={e=>handleIncrement(e)}
                            className="px-3 py-2 mr-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                            >
                                +
                            </button>
    
                        </div>
                    </div>
                    <div className="flex px-2 py-2 items-center justify-between">
                        <div className="flex">Enfants</div>
                        <div className="flex gap-3">
                            <button
                            id="child1"  
                            disabled={nbOfChild==0} 
                            onClick={e=>handleDecrement(e)}
                            className="px-3 py-2 ml-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                            >
                                -
                            </button>
                            <div className="py-2">
                                {nbOfChild}
                            </div>
                            <button
                            id="child" 
                            disabled={nbOfChild==place.maxChild} 
                            onClick={e=>handleIncrement(e)}
                            className="px-3 py-2 mr-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex px-2 py-2 items-center justify-between">
                        <div className="flex">Bébés</div>
                        <div className="flex gap-3">
                            <button
                                id="baby1"
                                disabled={nbOfBaby === 0}
                                onClick={(e) => handleDecrement(e)}
                                className="px-3 py-2 ml-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                            >
                                -
                            </button>
                            <div className="py-2">
                                {nbOfBaby}
                            </div>
                            <button
                                id="baby"
                                disabled={nbOfBaby === place.maxBaby}
                                onClick={(e) => handleIncrement(e)}
                                className="px-3 py-2 mr-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none"
                            >
                                +
                            </button>
                        </div>

                        
                    </div>
                        <button onClick={(e)=>handleReservation()} className="primary mt-4" >
                        Book this place 
                        {nbOfNights > 0 && (
                         price = nbOfNights * place.price,
                            <span className="px-2">{price}</span>
                        )}
                        </button>
                </div>
            </div>
            
        </>
     );
}
 
export default BookingWidget;