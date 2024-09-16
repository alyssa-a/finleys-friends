import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import App from './App.jsx'
import './index.css'
import Root from "./routes/root";
import ErrorPage from "./pages/error-page";
import Login from './routes/login';
import Favorites from './routes/favorites';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "favorites",
            element: <Favorites />,
          },
      ]
    },
    {
        path: "login",
        element: <Login />,
      }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
