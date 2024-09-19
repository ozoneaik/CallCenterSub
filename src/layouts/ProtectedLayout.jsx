import {Navigate, Outlet} from "react-router-dom";
import Box from "@mui/joy/Box";
import {CssVarsProvider} from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Sidebar from "../Layouts/Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {useEffect} from "react";
import {profileApi} from "../api/Auth.js";
import {LayoutStyle} from "../styles/LayoutStyle.js";

function ProtectedLayout() {
    const {user, setUser} = useAuth();

    useEffect(() => {
        (async () => {
            const {data, status} = await profileApi();
            if (status === 200) {
                setUser(data.user);
            }
            if (status === 401) {
                localStorage.removeItem('user');
                setUser(null);
                window.location.href = '/';
            }
        })();
    }, []);
    if (!user) {
        return <Navigate to="/login"/>;
    }
    return (
        <div>
            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline/>
                <Box sx={LayoutStyle.MainLayout}>
                    <Sidebar/>
                    <Navbar/>
                    <Box component="main" className="MainContent" sx={{flex: 1}}>
                        <Outlet/>
                    </Box>
                </Box>
            </CssVarsProvider>

        </div>
    );

}

export default ProtectedLayout;