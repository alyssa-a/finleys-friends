import { Outlet } from "react-router-dom";

export default function Root() {
    return (
    <>
    <header>
        <h1>Finleys Friends</h1>
    </header>
    <Outlet />
    </>
    );
}