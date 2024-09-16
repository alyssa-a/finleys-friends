import { useNavigate } from 'react-router-dom';
import { login } from '../common/api'

export default function LoginForm() {
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const requestBody = JSON.stringify( {
            name: formData.get("name"),
            email: formData.get("email")
        });

        const status = await login(requestBody);

        if (status === 200) {
            // after successful login, check if user exists in local storage
            // to keep track of their favorite dogs
            if (!localStorage.getItem(formData.get("name"))) {
                localStorage.setItem(formData.get("name"), "[]");
            }

            if (!localStorage.getItem("currentUser")) {
                localStorage.setItem("currentUser", formData.get("name"));
            }

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