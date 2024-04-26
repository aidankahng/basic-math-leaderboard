import { useEffect, useState } from "react";
import { getMe, updateMe } from "../lib/apiWrapper";
import { MyScoresType, UpdateUserDataType } from "../types";
import { useNavigate } from "react-router-dom";
import { Categories } from "../types";


// This view allows for users to modify their username, their password, and add/edit/delete a quote to go along with their cards. For the sake of retaining leaderboard stats, deletion does not make all data go away
export default function Profile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<MyScoresType>({
        user: '',
        clan: '',
        message: '',
        totalCorrect : NaN,
        totalQuestions : NaN,
        totalAttempted : NaN,
        numQuizzes : NaN,
        points : NaN,
        lastQuiz: {
            id: NaN,
            userId: NaN,
            category: NaN,
            user: '',
            totalQuestions: NaN,
            totalAttempted: NaN,
            totalCorrect: NaN,
            score: NaN
        }
    })

    const [updateUserData, setUpdateUserData] = useState<UpdateUserDataType>({
        password: '',
        username: '',
        message: '',
        newPassword: '',
        clan: ''
    })

    useEffect(() => {
        console.log('inside useEffect')
        
        async function getUserData() {
            const response = await getMe(localStorage.getItem('token') || '');
            if (response.data){
                console.log(response.data)
                setUserData(response.data)
                setUpdateUserData({
                    password: '',
                    username: response.data.user,
                    message: response.data.message,
                    newPassword: '',
                    clan: response.data.clan
                })
            }
        }

        if (!localStorage.getItem('token')) {
            navigate('/')
        } else {
            getUserData();
            console.log('quiz',userData.lastQuiz)
        }
    },[])

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        e.preventDefault();
        setUpdateUserData({...updateUserData, [e.target.name]: e.target.value});
    }

    const handleSubmitEditUser = async (e:React.FormEvent) => {
        e.preventDefault();
        const response = await updateMe(localStorage.getItem('token') || '', updateUserData);
        if (response.error) {
            console.warn(response.error)
        } else {
            console.log('SUCCESSFULLY EDITED USER', response.data)
            navigate('/')
        }
    }




    return (
        <>
        <div className="only-main">
            {userData.numQuizzes > 0 &&
            <>
            <h1>Your Info</h1>
            <div style={{display:'flex', justifyContent:'center', gap:'40px', marginBottom:'50px', marginTop:'30px'}}>
                <div>
                    <h2>Your Stats:</h2>
                    <h3>Total Points: {Math.round(userData.points*100)/100}</h3>
                    <p>Quizzes Submitted: {userData.numQuizzes}</p>
                    <p>Total Questions: {userData.totalQuestions}</p>
                    <p>Total Attempts: {userData.totalAttempted}</p>
                    <p>Total Correct: {userData.totalCorrect}</p>
                    <p>Accuracy: {userData.totalCorrect / userData.totalAttempted}</p>
                </div>
                <div>
                    <h2>Latest Quiz:</h2>    
                    <h3>Type: {Categories[userData.lastQuiz.category.toString()]} </h3>
                    <h3>Score: {Math.round(userData.lastQuiz.score*100)/100}</h3>
                    <p># Questions: {userData.lastQuiz.totalQuestions}</p>
                    <p>Attempted: {userData.lastQuiz.totalAttempted}</p>
                    <p>Correct: {userData.lastQuiz.totalCorrect}</p>
                </div>
            </div>
            </>
            }
            <div>
            <h1>Profile</h1>
            <form action="" onSubmit={handleSubmitEditUser}>
                <div>
                    <label htmlFor="">username: </label>
                    <input type="text" name="username" value={updateUserData.username} onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="">new password: </label>
                    <input type="password" name='newPassword' value={updateUserData.newPassword} onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="">Your Words of Wisdom: </label>
                    <textarea rows={3} cols={28} name='message' value={updateUserData.message} onChange={handleChangeInput}/>
                </div>
                <div>
                    <label htmlFor="">Clan Name: </label>
                    <input type="text" name="clan" value={updateUserData.clan} onChange={handleChangeInput} />
                </div>
                <div>
                    <label htmlFor="">Original Password*:</label>
                    <input style={{color:'red', backgroundColor:'#ffa2a2'}} type="password" name='password' value={updateUserData.password} onChange={handleChangeInput}/>
                </div>
                <p style={{fontSize:'0.7rem'}}>*original password must match to update user</p>
                <button type="submit">Update User Information</button>
            </form>
            </div>
        </div>
        </>
    )
}