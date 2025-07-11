import './App.css';
import { Routes,Route } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Register/Register.jsx';
import Home from './User/Home';
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
