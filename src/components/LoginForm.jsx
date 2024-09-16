export default function LoginForm() {
    return (
        <form>
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