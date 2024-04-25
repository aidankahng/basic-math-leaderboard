import { useState } from "react"
import { signUp } from "../lib/apiWrapper"
import { SignUpFormDataType } from "../types"

type SignUpProps = {

}

export default function SignUp( { } : SignUpProps ) {

    const [signUpFormData, setSignUpFormData] = useState<SignUpFormDataType>({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(signUpFormData)
        let response = await signUp(signUpFormData);
        if (response.error) {
            console.warn(response.error)
        } else {
            console.log(response.data)
            let newUser = response.data!;
            console.log(`Congrats! ${newUser.username} has been created!`)
        }
    }

    return (
        <>
        <h2>Sign Up Here</h2>
        <form onSubmit={handleFormSubmit}>
            <p>Username: <input type="text" name="username" placeholder="username" value={signUpFormData.username} onChange={handleInputChange} /> </p>
            <p>Password: <input type="password" name="password" placeholder="password" value={signUpFormData.password} onChange={handleInputChange} /> </p>
            <p>Confirm Password: <input type="password" name="confirmPassword" placeholder="password" value={signUpFormData.confirmPassword} onChange={handleInputChange} /> </p>
            <button type="submit">Create New Account</button>
            
        </form>
        </>
    )
}