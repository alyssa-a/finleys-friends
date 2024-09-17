import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../common/api";
import { ChevronDownIcon, MagnifyingGlassIcon, HeartIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"; 

export default function Navigation() {
    const currentUser = localStorage.getItem("currentUser");
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogout = () => {
        logout();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("LoggedIn");
        navigate("/login");
    }

    useEffect(() => {
        setShowMenu(false);
    }, [location]);

    return (
        <div className="relative">
            <button 
                className="flex gap-x-1 items-center"
                onClick={toggleMenu}
            >
                Woof, {currentUser}!
                <ChevronDownIcon className="size-4"/>
            </button>
            
            <nav className={`min-w-52 absolute top-full right-0 py-2 bg-white text-slate-950 drop-shadow z-50 ${showMenu ? "visible" : "invisible"}`}>
                <ul className="flex flex-col gap-y-2">
                    <li>
                        <Link className="flex gap-x-1 items-center px-5 py-1 hover:bg-cyan-100" to="/">
                            <MagnifyingGlassIcon className="size-4"/>
                            Search Dogs
                        </Link>
                    </li>
                    
                    <li>
                        <Link className="flex gap-x-1 items-center px-5 py-1 hover:bg-cyan-100" to="/favorites">
                            <HeartIcon className="size-4"/>
                            Favorites
                        </Link>
                    </li>

                    <li>
                        <button 
                            className="flex gap-x-1 items-center px-5 py-1 w-full hover:bg-cyan-100"
                            onClick={handleLogout}
                        >
                            <ArrowRightStartOnRectangleIcon className="size-4"/>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}