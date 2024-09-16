import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
    return (
        <>
            <Header/>
            
            <div className="container my-8">
                <Outlet/>
            </div>
        </>
    )
}