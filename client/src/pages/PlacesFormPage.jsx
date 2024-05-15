import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import { useParams,Navigate } from "react-router-dom";
 
const PlacesFormPage = () => {
    const[rmPhoto,setRmPhoto]=useState(null);
    const [redirect,setRedirect]=useState(false);
    const {action} = useParams();
    const { register, handleSubmit, setValue ,formState: { errors } } = useForm();
    const [addedPhoto,setAddedPhoto]=useState([]);
    let formData={};
    const onSubmit = (data) => {formData = {...data};savePlace()};
    



    useEffect(() => {
        if(action == 'new'){
            return;
        }
        axios.get('/places/'+action).then(response => {
            const {data} = response;
            setAddedPhoto(data.addedPhoto)
            Object.keys(data).forEach(key => {
                setValue(key, data[key]); // Utilisation de setValue pour mettre à jour la valeur des champs de formulaire
            });
        });
    },[action])

    


    

    async function savePlace(){
        
        const {title, address,description, perks, extraInfo, checkIn, checkOut, maxGuests,maxChild,maxBaby,price} = formData;
        
         if(action === 'new'){
            await axios.post('/places', {
                title, address, addedPhoto, 
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests,maxChild,maxBaby,price
            });
        } else{
                if(rmPhoto){
                    await axios.post('/rmphoto', {rmPhoto});
                }
            await axios.put('/places', {
                action,title, address, addedPhoto, 
                description, perks, extraInfo, 
                checkIn, checkOut, maxGuests,maxChild,maxBaby,price
             });
        }
        setRedirect(true);
    }

    if(redirect){
        return <Navigate to={"/account/places"}/> 
    }
    

    return ( 
        <>
            
            <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">title for your place. should be short and catchy</p>
                        <input type="text" placeholder="title, for example: My lovely apt" {...register('title', { required: true })} />
                        <h2 className="text-2xl mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">Address to this place</p>
                        <input type="text" placeholder="address" {...register('address', { required: true })} />
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">more = better</p>
                        

                        <PhotosUploader addedPhoto={addedPhoto} onChange={setAddedPhoto} onChange1={setRmPhoto} rmPhoto={rmPhoto} />


                        <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">description of the place</p>
                        <textarea {...register('description', { required: true })} />
                        

                        
                    
                        <Perks selected={register} />
                    
                        

                        <h2 className="text-2xl mt-4">Extra info</h2>
                        <p className="text-gray-500 text-sm">house rules, etc</p>
                        <textarea {...register('extraInfo', { required: true })}/>
                        <h2 className="text-2xl mt-4">Check un&out times</h2>
                        <p className="text-gray-500 text-sm">add check in and out times, remeber to have some time window for cleaning the room between guests</p>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="time" placeholder="12:00" {...register('checkIn', { required: true })}/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out tinme</h3>
                                <input type="time" placeholder="12:00" {...register('checkOut', { required: true })} />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of Guests</h3>
                                <input type="number" placeholder="1" {...register('maxGuests', { required: true , min:1 })}/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of Child</h3>
                                <input type="number" placeholder="1" {...register('maxChild', { required: true , min:1 })}/>
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of Baby</h3>
                                <input type="number" placeholder="1" {...register('maxBaby', { required: true , min:1 })}/>
                            </div>
                           
                        </div>
                        <h2 className="text-2xl mt-4">Price per Night</h2>
                        <p className="text-gray-500 text-sm"></p>
                        <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3 className="mt-2 -mb-1">Price</h3>
                            <input type="number" placeholder="1" {...register('price', { required: true , min:1 })}/>
                        </div>
                        </div>
                        <div className="my-4">
                            <button className="primary">Save</button>
                        </div>
                        
                        
                    </form>
                </div>
        </>
     );
}
 
export default PlacesFormPage;