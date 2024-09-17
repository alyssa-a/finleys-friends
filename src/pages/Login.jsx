import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import { getWithTTL } from "../common/localStorageTTL";

export default function Login() {
    const navigate = useNavigate();
    const loggedIn = getWithTTL("LoggedIn");

    useEffect(() => {
        if (loggedIn != null) {
            navigate("/", { replace: true })
        }
    }, [loggedIn, navigate]);

    return (
        <div className="bg-cyan-700 min-w-full min-h-screen flex items-center justify-center text-white bg-paw-print p-8">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 words-condensed">Finley&rsquo;s Friends</h1>
                <p className="mb-5 text-xl">Login to find your paw-fect match!</p>
                <LoginForm/>
            </div>
        </div>
    )
}