import { Link } from "react-router-dom"

type NavigationProps = {
    handleLogOut: () => void
}

export default function Navigation ({handleLogOut}: NavigationProps) {
    
    return (
        
        <div className="nav-container" style={{gridArea:'nav'}}>
            <nav className="nav">
                <h3><Link className="link" to='/'>Math Hiscores</Link></h3>
                <p><Link className="link" to='/practice'>Practice</Link></p>
                <p><Link className="link" to='/quiz'>Quiz</Link></p>
                {!localStorage.getItem('token') && <p><Link className="link" to='/login'>Log In</Link></p>}
                {!localStorage.getItem('token') && <p><Link className="link" to='/signup'>Sign Up</Link></p>}
                {localStorage.getItem('token') && <p onClick={handleLogOut}><Link className="link" to='/'>Log Out</Link></p>}
            </nav>
        </div>
        
    )
}