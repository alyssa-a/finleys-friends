import { Link } from "react-router-dom";
import Navigation from "./Navigation";

export default function Header() {
    return (
        <header className="min-w-full py-5 bg-cyan-700 text-white">
            <div className="container flex gap-x-7 justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold words-condensed">
                        <Link to="/">Finley&rsquo;s Friends</Link>
                    </h1>
                </div>

                <Navigation/>

            </div>
        </header>
    );
}