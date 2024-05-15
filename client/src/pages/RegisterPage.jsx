import { Link } from "react-router-dom";
import '../index.css'
import { useState } from "react";
import axios from "axios";
const RegisterPage = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
 

    async function registerUser(event){
        
        event.preventDefault()
        try{
            await axios.post('/register',{
                name,
                email,
                password
            });
            alert('Registration successul. Now you can log in');
        }catch(e){
            alert('Registration failed. Please try again');
        }
        
        
    }
    return ( 
        <div>
            <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                    <form className="max-w-md mx-auto" onSubmit={registerUser}>
                        <input type="text" 
                               placeholder="Name"
                               value={name} 
                               onChange={e =>setName(e.target.value)}/>
                        <input type="email" 
                               placeholder="your@email.com"
                               value={email} 
                               onChange={e =>setEmail(e.target.value)} />
                        <input type="password" 
                               placeholder="password"
                               value={password} 
                               onChange={e =>setPassword(e.target.value)} />
                        <button className="primary">Register</button>
                        <div className="text-center py-2 text-gray-500" >Allready a member?
                            <Link className="underline text-black" to={'/Login'}>Login Now</Link>
                        </div>
                    </form>
            </div>
        </div>
        </div>
     );
}
 
export default RegisterPage;