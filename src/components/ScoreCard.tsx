import { HighScoresType } from "../types";

type ScoreCardProps = {
    userScore: HighScoresType,
    rank : number
};
export default function ScoreCard({ userScore, rank }: ScoreCardProps) {
    return (
    <div className="card">
        <div>
            <h4>
                <span style={rank===1 ? {color:"gold", fontSize:"2rem"} : rank === 2 ? {color:"silver", fontSize:"1.5rem"} : rank === 3 ? {color:"brown", fontSize:"1.3rem"} : {color:"black"}}>
                    {rank===1 ? <>&#x1F451;</> : ''}  Rank: {rank} - {userScore.user} <br/>
                    Score: {Math.round(userScore.points*100)/100}
                </span>
            </h4>
            <h4>Clan: {userScore.clan}</h4>
            <p>{userScore.message}</p>
            <p>{userScore.numQuizzes} quizzes taken | {userScore.totalCorrect} correct | {userScore.totalAttempted} attempted</p>
        </div>
    </div>
);
}
