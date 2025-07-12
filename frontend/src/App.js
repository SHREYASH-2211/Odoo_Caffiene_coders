import './App.css';
import { Routes,Route } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Register/Register.jsx';
import Home from './User/Home/Home.jsx';
import Profile from './User/Profile/Profile.jsx';
import Swaps from './User/Swap/Swap.jsx';
import SwapRequests from './User/SwapRequest/SwapRequests.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path ="/create-profile" element={<Profile/>}/>
        <Route path ='/swaps' element={<Swaps/>} />
        <Route path ='/swapsrequest' element={<SwapRequests/>} />

      </Routes>
    </>
  );
}

export default App;
