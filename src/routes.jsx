import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import MainChat from "./views/ChatPages/MainChat.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import Login from "./views/Login.jsx";
import NotFoundPage from "./views/NotFound.jsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {path: '/', element: <Login />,},
        ],
    },
    {
        path: '/', element: <ProtectedLayout/>, children: [
            {path: 'home', element: <App/>},
            {
                path: '/chat', children: [
                    {path: 'room/:roomId', element: <MainChat/>,}
                ]
            }
        ]
    },
    {path : '*' , element : <NotFoundPage/>}
])