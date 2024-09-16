import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { login, logout } from "../common/api";

export default function Root() {
    return (
        <>
            <Header/>

            <button onClick={login}>
        Login
      </button>

      <button onClick={logout}>
        Logout
      </button>
            <Outlet/>
        </>
    );
}