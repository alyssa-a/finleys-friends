import LoginForm from "../components/LoginForm"

export default function Login() {
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