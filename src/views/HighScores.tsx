import { useEffect, useState } from "react"
import { getHighscores } from "../lib/apiWrapper"
import { HighScoresType } from "../types";


type HighScoresProps = {

}

export default function HighScores() {

    const [scores, setScores] = useState<HighScoresType[]>([]);

    // use useEffect to get highscore data from api
    useEffect(() => {
        console.log('inside useEffect')
        async function fetchScores() {
            const response = await getHighscores();
            if (response.data){
                console.log(response.data)
                setScores(response.data!.slice(0,20))
            }
        }
        fetchScores();
    },[])
    // Display additional personal highscores if logged in w/ valid token

    // probbly better to make a component that will be "reloaded" when scores changes


    return (
        <>
        <h3>High Scores:</h3>
        <div>
            <button>Load Highscores</button>
            <p>username ---- correct/attempts</p>
            {scores.map((score) => (
                <p key={score.user}>{score.user} ----- {score.totalCorrect}/{score.totalAttempted}/{score.totalQuestions}</p>
            ))}
        </div>
        </>
    )
}