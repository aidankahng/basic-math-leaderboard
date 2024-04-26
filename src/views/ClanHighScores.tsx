import { useEffect, useState } from "react"
import { getClanHighscores } from "../lib/apiWrapper"
import { HighScoresType } from "../types";
import ScoreCard from "../components/ScoreCard";


export default function ClanHighScores() {

    let rank = 0
    const [scores, setScores] = useState<HighScoresType[]>([]);

    // use useEffect to get highscore data from api
    useEffect(() => {
        console.log('inside useEffect')
        async function fetchScores() {
            const response = await getClanHighscores(localStorage.getItem('token') || '');
            if (response.data){
                console.log(response.data);
                setScores(response.data!);
            }
        }
        fetchScores();
    },[])



    // Display additional personal highscores if logged in w/ valid token

    // probbly better to make a component that will be "reloaded" when scores changes
    //<p key={score.user}>{score.user} -----Score:{Math.round(score.points * 100)/100} ----- {score.totalCorrect}/{score.totalAttempted}/{score.totalQuestions}</p>

    return (
        <>
            <div className="col1" style={{display:"flex", flexDirection:'column' , alignItems:'center', gap:'20px'}}>
            </div>
        
            <div className="main" style={{gridArea:'main'}}>
                <h1 className="title">Your Clan's Leaderboard:</h1>
                <div>
                    {scores.slice(0,10).map((score) => {
                        rank += 1
                        return <ScoreCard key={rank} userScore={score} rank={rank}/>
                    })}
                </div>
            </div>
            <div className="col2">

            </div>
        </>
    )
}