import { useState } from "react";

type Props = {};
export default function Tip({}: Props) {
    
    const tips = [
        `Use the left and right arrow keys to go back or skip during a quiz`,
        `Multiples of 5 always end in 0 or 5`,
        `Multiples of 3 always have digits which add to a multiple of 3`,
        `Different types of questions may be worth more points`,
        `Multiples of 2 end in 0, 2, 4, 6, 8`,
        `The square of a number ending in 5 has a shortcut: ex1. 25^2 = 625 or (2*3)25 ex2. 45^2 = 2025 or (4*5)25`,

    ]

    const [tipIndex, setTipIndex] = useState<number>(0)
    

    return (
    <>
        <button onClick={()=>{setTipIndex((tipIndex + 1) % tips.length)}}>Next Tip</button>
        <p style={{height:'4rem'}}>{tips[tipIndex]}</p>
        <div style={{marginBottom:'50px'}}></div>
    </>
    );
}
