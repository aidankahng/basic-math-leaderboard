import { BasicProblemType } from "../types";

type ReviewQuestionCardProps = {
    question: BasicProblemType
};
export default function ReviewQuestionCard({ question }: ReviewQuestionCardProps) {
    return (
    <div className="card">
        <div>
            <h2>{question.prompt}</h2>
            <p>Your Answer: {question.response}</p>
            <p>Solution: {Math.round(parseFloat(question.answer)*100)/100}</p>
        </div>
    </div>
);
}
