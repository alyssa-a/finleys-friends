import { useNavigate } from 'react-router-dom';
import { login } from '../common/api';
import { setWithTTL } from '../common/localStorageTTL';

export default function LoginForm() {
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userName = formData.get("name");
        const userEmail = formData.get("email")

        const requestBody = JSON.stringify( {
            name: userName,
            email: userEmail
        });

        const status = await login(requestBody);

        if (status === 200) {
            // store logged in status
            setWithTTL("LoggedIn", true, 3600000);

            // store user's favorite dogs in a key with their name
            if (!localStorage.getItem(userName)) {
                localStorage.setItem(userName, "[]");
            }

            // store user's name to track current user
            if (!localStorage.getItem("currentUser")) {
                localStorage.setItem("currentUser", "");
            }

            localStorage.setItem("currentUser", userName);

            navigate("/");
        }
    }
    
    return (
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label htmlFor="name" className="block mb-1">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md px-2 py-1.5 text-slate-950"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-1">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md px-2 py-1.5 text-slate-950"
                />
            </div>

            <button 
                type="submit"
                className="rounded-sm border px-4 py-2 hover:bg-cyan-950"
            >
                Login
            </button>
        </form>
    );
}