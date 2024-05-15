import axios from "axios";
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const IndexPage = () => {
    const [place,setPlace]=useState([]);
    useEffect(() => {
        axios.get('/places').then(({data}) => {
            setPlace(data);
        })
    },[])

    return ( 
        <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {place.length > 0 && place.map((p,i) => (
                <Link to={'/place/'+p._id} key={i}>
                    <div className="bg-gray-500 rounded-2xl flex"> 
                        <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+p.addedPhoto?.[0]} alt="" />
                    </div>
                    <div>
                        <h2 className="text-bold">{p.address}</h2>
                        <h3 className="font-sm text-gray-500"> {p.title}</h3>
                        <div className="mt-1">
                           <span className="font-bold"> ${p.price} </span>per night
                        </div>
                    </div>
                </Link>
            ))}
        </div>
     );
}
 
export default IndexPage;