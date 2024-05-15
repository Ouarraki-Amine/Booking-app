import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import Navbar from "../Navbar";
import BookingsPage from "./BookingsPage";


const AccountPage = () => {
    const [redirect,setRedirect]=useState(null);
    const {user,ready,setUser}=useContext(UserContext);
    let {subpage} = useParams();
    if(subpage===undefined){
        subpage='profile';
    }

    async function logout(){
        await axios.post('/logout')
        setUser(null);
        setRedirect('/');
    }
   
    if(!ready){
        return 'Loading...';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    
    if(redirect){
        return<Navigate to={redirect}/>
    }

    
    return ( 
        <div>
           <Navbar subpage={subpage}/>


           {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email})<br/>
                {console.log(user.name)}
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
           )}
           {subpage === 'places' && (
            <PlacesPage />
           )}
           {subpage === 'bookings' && (
            <BookingsPage />
           )}
        </div>
     );
}
 
export default AccountPage;