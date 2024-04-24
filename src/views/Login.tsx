import { useState } from "react"
import { LoginFormDataType } from "../types"
import { login } from "../lib/apiWrapper"
import { useNavigate } from "react-router-dom"

type LoginProps = {
    handleLogOut: () => void
}

export default function Login( { handleLogOut } : LoginProps ) {
    const navigate = useNavigate();


    const [loginFormData, setLoginFormData] = useState<LoginFormDataType>({
        username: '',
        password: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(loginFormData)
        if (localStorage.getItem('token')) {
            console.warn("You are already logged in. Please log out first before trying again.")
        } else {
            let response = await login(loginFormData);
            if (response.error) {
                console.warn(response.error)
            } else {
                console.log(response.data)
                localStorage.setItem('token', response.data!)
                localStorage.setItem('username', loginFormData.username)
                console.log(`Congrats! You have been logged in`)
                navigate('/')
            }
        }
    }



    if (localStorage.getItem('token')) {
        return (
            <>
            <h3>You are already logged in as: {localStorage.getItem('username')}</h3>
            <button onClick={handleLogOut} >Log Out</button>
            </>
        )
    }

    return (
        <>
        <h2>Login Here</h2>
        <form onSubmit={handleFormSubmit}>
            <p>Username: <input type="text" placeholder="username" name="username" value={loginFormData.username} onChange={handleInputChange} /></p>
            <p>Password: <input type="password" placeholder="password" name="password" value={loginFormData.password} onChange={handleInputChange} /></p>
            <button type="submit">Log In</button>
        </form>
        </>
    )

}