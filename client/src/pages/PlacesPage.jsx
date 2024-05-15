import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import axios from "axios";
import PlaceImg from "./PlaceImg";



const PlacesPage = () => {
    const {action} = useParams();
    const [redirect,setRedirect]=useState(false);
    
    const [place,setPlace]=useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlace(data);
        })
    }, [action,redirect]);

   async function handleTrush(e,id){
        const sur = confirm('tu veux supprimer')
        if(sur){
        await axios.delete(`/delete/${id}`);
        alert('supp')
        setRedirect(true)}
        else{
            alert('not supp')
        }
        
    }
   
    

   
    return ( 
        <div>
            
            {(action === undefined) ?<> 
                <>
                    <div className="text-center mt-4">
                        
                        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        Add new place
                        </Link>

                    </div>
                    <div className="mt-4">
                        {place.length > 0 && place.map((p,i) => (
                            
                            <div key={i}>
                            <Link to={'/account/places/'+p._id} className="flex mt-4 cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl">
                                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                                   
                                    <PlaceImg place={p} />
                                   
                                </div>
                                <div className="grow-0 shrink">
                                    <h2 className="text-xl">{p.title}</h2>
                                    <p className="text-sm mt-2">{p.description}</p>
                                </div>
                                
                            </Link>
                            <div className="h-10 relative">
                                    
                                <button onClick={e=>handleTrush(e,p._id)} className="cursor-pointer absolute bg-opacity-55 text-white rounded-xl bg-black p-2">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    
                                </button>
                                </div>
                            
                            </div>
                        ))}
                    </div>
                </>
            </>:<PlacesFormPage />}
        </div>
    )
}
 
export default PlacesPage;