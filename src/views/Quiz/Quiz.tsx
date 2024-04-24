import { useState } from "react";
import { getProblems, submitProblems } from "../../lib/apiWrapper";
import { QuizProblemsType } from "../../types";
import { useNavigate } from "react-router-dom";

type QuizProps = {

}

export default function Quiz( {}:QuizProps ) {
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState<QuizProblemsType>({
        userId: NaN,
        category: NaN,
        questions: []
    })

    const [quizCategory, setQuizCategory] = useState<number>(1);
    const [numQuestions, setNumQuestions] = useState<number>(5);

    
    const [currentQIndex, setCurrentQIndex] = useState<number>(0)

    const [inputValue, setInputValue] = useState<{value:string}>({value:''})


    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setQuizCategory(+e.target.value)
    }

    const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNumQuestions(+e.target.value);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    const handleStartQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        // Hard coded type of problem for now
        let response = await getProblems(quizCategory, numQuestions, localStorage.getItem('token') || '');
        if (response.error) {
            console.warn(response.error)
        } else {
            console.log(response.data)
            setQuiz(response.data!)
        }
    }

    const handleSubmitProblem = (e: React.FormEvent) => {
        e.preventDefault();
        // Only handle submit if it is a valid input
        // need to add logic here
        if (inputValue.value != '') {
            quiz.questions[currentQIndex]['response'] = inputValue.value
            setQuiz({...quiz})
            console.log(quiz.questions[currentQIndex])
            // Add the response property to the question
            // setQuiz({...quiz, ['questions'][currentQIndex]!['response']: inputValue.value})

            setCurrentQIndex(currentQIndex + 1)
            setInputValue({value:''})
            console.log(e.target)
        }
    }

    const handleSubmitQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        let response = await submitProblems(quiz, localStorage.getItem('token') || '');
        if (response.error) {
            console.warn(response.error)
        } else {
            console.log(response.data)
            setQuiz({
                userId: NaN,
                category: NaN,
                questions: []
            })
            setCurrentQIndex(0)
            setNumQuestions(5)
            setQuizCategory(1)
        }
    }

    const logQuiz = () => {
        console.log(quiz)
    }

        
    if (!localStorage.getItem('token') || '') {
        return (
            <>
            <h3>This feature is only available for logged in users</h3>
            </>
        )
    }
    if (quiz.questions.length == 0) {
        return (
            <>
            <select name="category-select" id="" onChange={handleCategoryChange}>
                <option value={1}>Basic Addition</option>
                <option value={2}>2-digit Addition</option>
                <option value={3}>3-digit Addition</option>
                <option value={4}>Basic Subtraction</option>
                <option value={5}>2-digit Subtraction</option>
                <option value={6}>3-digit Subtraction</option>
                <option value={7}>Basic Multiplication</option>
                <option value={8}>Basic Division</option>
                <option value={9}>2-digit Multiplication</option>
                <option value={10}>Simplify Division</option>
            </select>
            <select name="num-questions-select" id="" onChange={handleNumQuestionsChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            <button onClick={handleStartQuiz}>START QUIZ</button>
            </>
        )
    } else {
        return (
            <>
            {(currentQIndex < quiz.questions.length) 
            ? <form onSubmit={handleSubmitProblem}>
                <h3>{quiz.questions[currentQIndex].prompt} <input autoFocus type="text" name="value" value={inputValue.value} onChange={handleInputChange} onKeyUp={e => {
                    if (e.key === 'ArrowLeft') {
                        setCurrentQIndex(Math.max(0,currentQIndex-1))
                    } else if (e.key === 'ArrowRight') {
                        setCurrentQIndex(Math.min(quiz.questions.length-1, currentQIndex+1))
                    }
                }} /> </h3>
                {quiz.questions[currentQIndex].response && <><p>Submitted: {quiz.questions[currentQIndex].response}</p></>}
            </form>
            : 
            <>
                <h4>The quiz is complete.</h4>
                <button onClick={logQuiz}>Log Answers in Console</button>
                <button onClick={handleSubmitQuiz}>Submit Quiz</button>
            </>
            }
            </>
        )
    }
}