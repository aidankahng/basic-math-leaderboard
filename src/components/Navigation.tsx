import { Link } from "react-router-dom"

type NavigationProps = {

}

export default function Navigation () {
    
    return (
        <>
        <nav style={{display:'flex', width:'80%', justifyContent:'left', gap:'20px'}}>
            <h3><Link to='/'>Math Hiscores</Link></h3>
            <p><Link to='/practice'>Practice</Link></p>
            <p><Link to='/quiz'>Quiz</Link></p>
            <p><Link to='/login'>Log In</Link></p>
            <p><Link to='/signup'>Sign Up</Link></p>
        </nav>
        </>
    )
}