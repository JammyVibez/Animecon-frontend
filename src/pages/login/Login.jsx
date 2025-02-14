import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import AnimeRandomQuote from "../../components/AnimeRandomQuote"
import background from "../../Utilities/img/background.webp"
const API = process.env.REACT_APP_API_URL;


export default function Login() {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const userId = user ? user._id : null;
    


    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", email.current.value, password.current.value);
        await loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };
    
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">AnimeCon</h3>
                    <div
					className="col-40 max-sm:h-[calc(var(--vh,1vh)*100)] relative"
					style={{
						background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${background})`,
						backgroundSize: "cover",
						backgroundRepeat: "no-repeat",
						backgroundPosition: "center",
					}}
				>
					<AnimeRandomQuote />
				</div>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" required ref={email} />
                        <input placeholder="Password" minLength={"6"} type="password" className="loginInput" required ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="pink" size={"30px"}/>: "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to={"/register"} style={{ textDecoration: "none" }}>
                        <button className="loginRegisterButton">
                        {isFetching ? (<CircularProgress color="pink" size={"30px"}/>) : ("Create a New Account")  }
                            </button>
                            </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}