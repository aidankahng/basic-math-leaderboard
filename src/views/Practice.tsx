import { useState } from "react";
import { getRandom } from "../lib/apiWrapper";
import { BasicProblemType } from "../types";


type PracticeProps = {

}

export default function Practice() {

    const [displayQuestion, setDisplayQuestion] = useState<BasicProblemType>({
        prompt: '',
        answer: ''
    })

    const [inputValue, setInputValue] = useState<string>("")

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInputValue(e.target.value!)
    }

    const handleButtonPress = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Clicked the button press")
        let response = await getRandom();
        if (response.error) {
            console.warn(response.error)
        } else {
            console.log(response.data)
            setDisplayQuestion(response.data!)
            setInputValue('')
        }
    }

    return (
        <>
        <div className="main">
            <h1>Practice Problems</h1>
            <button onClick={handleButtonPress}>New Question</button>
            <p>{displayQuestion.prompt}</p>
            <form onSubmit={handleButtonPress}>
                <input className="quiz-input" type="text" value={inputValue} onChange={handleInputChange} style={inputValue===displayQuestion.answer && inputValue != '' ? {backgroundColor:'#87ffcd'} : {}} />
            </form>
            <p>Click the 'New Question' button or press 'Enter' to generate a new question.</p>
        </div>
        </>
    )
}