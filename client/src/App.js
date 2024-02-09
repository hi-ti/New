import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Dashboard from  './Components/Dashboard/Dashboard'
import LoginPrompt from './Components/public/public';

function App() {
  // const token = sessionStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path = '/' element = {<LoginPrompt/>}/>
          <Route exact path='/register' element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
