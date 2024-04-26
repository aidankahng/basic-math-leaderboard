import { Link } from "react-router-dom";
import img1 from "../assets/pyramid_prism_265.jpg";

type NavigationProps = {
    handleLogOut: () => void;
};

export default function Navigation({ handleLogOut }: NavigationProps) {
    return (
        <div className="nav-container" style={{ gridArea: "nav" }}>
            <nav className="nav">
                <Link
                    className="link"
                    to="/"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <img
                        src={img1}
                        alt="pyramid_logo"
                        style={{ height: "50px", margin: "0px" }}
                    />
                    <h3>Leaderboard</h3>
                </Link>
                
                <Link className="link" to="/practice">
                    Practice
                </Link>
                {localStorage.getItem("token") && <Link className="link" to="/quiz">
                    Play
                </Link>}
                {localStorage.getItem("token") && <Link className="link" to='/clan'>Clan</Link>}
                {localStorage.getItem("token") && <Link className="link" to="/profile">
                    Profile
                </Link>}
                {!localStorage.getItem("token") && (
                    <p>
                        <Link className="link" to="/login">
                            Log In
                        </Link>
                    </p>
                )}
                {!localStorage.getItem("token") && (
                    <p>
                        <Link className="link" to="/signup">
                            Sign Up
                        </Link>
                    </p>
                )}
                {localStorage.getItem("token") && (
                    <p onClick={handleLogOut}>
                        <Link className="link logout" to="/">
                            Log Out
                        </Link>
                    </p>
                )}
            </nav>
        </div>
    );
}
