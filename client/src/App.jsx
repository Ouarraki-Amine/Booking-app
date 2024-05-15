import {Route, Routes} from "react-router-dom"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage"
import AccountPage from "./pages/AccountPage";
import Layout from "./Layout"
import RegisterPage from "./pages/RegisterPage"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import PlacePlage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL='http://localhost:4000';
axios.defaults.withCredentials=true;


function App() {
   
  return (
    <>
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={ <IndexPage /> }/>
        <Route path="/login" exact element={<LoginPage/>}/>
        <Route path="/register" exact element={<RegisterPage/>}/>
        <Route path="/account/:subpage?/:action?"  element={<AccountPage/>}/>
        <Route path="/place/:id" element={<PlacePlage/>} />
        <Route path="account/bookings" exact element={<BookingsPage/>} />
        <Route path="account/bookings/:id" exact element={<BookingPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
    </>
  )
}

export default App
