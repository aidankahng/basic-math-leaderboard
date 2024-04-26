import { useState } from "react"
import { signUp } from "../lib/apiWrapper"
import { SignUpFormDataType } from "../types"
import { useNavigate } from "react-router-dom"

type SignUpProps = {

}

export default function SignUp( { } : SignUpProps ) {
    const navigate = useNavigate();

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
            navigate('/')
        }
    }

    if (localStorage.getItem('token')) {
        return (
            <>
            <div className="main">
                <p>You are already logged in.</p>
            </div>
            </>
        )
    } else {
        return (
            <>
            <div className="main">
            <h1 className="title">Sign Up Here</h1>
            <form onSubmit={handleFormSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div>
                    <label className="form-label" htmlFor="username">Username: </label> 
                    <input type="text" name="username" placeholder="username" value={signUpFormData.username} onChange={handleInputChange} /> 
                </div>
                <div>
                    <label className="form-label" htmlFor="password">Password: </label>
                    <input type="password" name="password" placeholder="password" value={signUpFormData.password} onChange={handleInputChange} />
                </div>
                <div>
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" name="confirmPassword" placeholder="password" value={signUpFormData.confirmPassword} onChange={handleInputChange} />
                </div>
                <button type="submit" style={{marginRight:'20px'}}>Create New Account</button>
            </form>
            </div>
            </>
        )
    }
}