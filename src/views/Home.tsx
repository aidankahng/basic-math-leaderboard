import { useEffect, useState } from "react"
import { getAllScores } from "../lib/apiWrapper"
import { AllScoresType, ScoreType } from "../types";


type HomeProps = {

}

export default function Home() {

    const [scores, setScores] = useState<AllScoresType>({});

    const [scoreTable, setScoreTable] = useState<ScoreType[]>([]);


    // use useEffect to get highscore data from api
    useEffect(() => {
        console.log('inside useEffect')
        async function fetchScores() {
            const response = await getAllScores();
            if (response.data){
                console.log(response.data)
                setScores(response.data!)
            }
        }
        fetchScores();
    },[])
    // Display additional personal highscores if logged in w/ valid token


    const createTable = () => {
        const table = []
        for (const username in scores){
            const block = {
                username: username,
                correct: scores[username]['correct'],
                attempted: scores[username]['attempted']
            }
            table.push(block)
        }
        console.log(table)
        setScoreTable(table)
    }


    return (
        <>
        <h3>High Scores:</h3>
        <div>
            <button onClick={createTable}>Load Highscores</button>
            <p>username ---- correct/attempts</p>
            {scoreTable.map((score) => (
                <p key={score.username}>{score.username} ----- {score.correct}/{score.attempted}</p>
            ))}
        </div>
        </>
    )
}