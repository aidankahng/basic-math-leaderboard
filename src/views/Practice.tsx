import { useState } from "react";
import { getHome } from "../lib/apiWrapper";
import { BasicProblemType } from "../types";


type PracticeProps = {

}

export default function Practice() {

    const [displayQuestion, setDisplayQuestion] = useState<BasicProblemType>({
        prompt: 'Question Here',
        answer: 'Answer Here'
    })

    const handleButtonPress = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Clicked the button press")
        let response = await getHome();
        if (response.error) {
            console.warn(response.error)
        } else {
            console.log(response.data)
            setDisplayQuestion(response.data!)
        }
    }

    return (
        <>
        <div className="main">
            <h1>Random Practice Problem</h1>
            <p>{displayQuestion.prompt}</p>
            <p>{displayQuestion.answer}</p>
            <button onClick={handleButtonPress}>New Question</button>
        </div>
        </>
    )
}