import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./views/SignUp";
import Practice from "./views/Practice";
import Login from "./views/Login";
import Quiz from "./views/Quiz/Quiz";
import Home from "./views/Home";
import Navigation from "./components/Navigation";

function App() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/')
    }


    return (
        <>
            <Navigation />
            <h1>Welcome</h1>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login handleLogOut={handleLogOut} />} />
                <Route path='/practice' element={<Practice />} />
                <Route path='/quiz' element={<Quiz />} />
            </Routes>
        </>
    );
}

export default App;
