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
            <p>Solution: {question.answer}</p>
        </div>
    </div>
);
}
