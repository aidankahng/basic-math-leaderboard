import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./views/SignUp";
import Practice from "./views/Practice";
import Login from "./views/Login";
import Quiz from "./views/Quiz/Quiz";
import Navigation from "./components/Navigation";
import HighScores from "./views/HighScores";
import Profile from "./views/Profile";
import ClanHighScores from "./views/ClanHighScores";

function App() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/')
    }


    return (
        <>
            <div className="main-grid">
            <Navigation handleLogOut={handleLogOut} />
            <Routes>
                <Route path='/' element={<HighScores />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login handleLogOut={handleLogOut} />} />
                <Route path='/practice' element={<Practice />} />
                <Route path='/quiz' element={<Quiz />} />
                <Route path='/profile' element={<Profile />}/>
                <Route path='/clan' element={<ClanHighScores/>} />
            </Routes>
            </div>
        </>
    );
}

export default App;
