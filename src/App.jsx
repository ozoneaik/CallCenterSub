import {useEffect, useState} from "react";
import {Button, Snackbar} from "@mui/joy";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useNotification} from "./context/NotiContext.jsx";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";

function App() {
    const [sender, setSender] = useState({});
    const [state, setState] = useState({
        open : false,
        vertical: 'top',
        horizontal: 'center',
    });
    const {notification} = useNotification();
    const { vertical, horizontal, open } = state;

    useEffect(() => {
        if (notification) {
            setSender(notification);
            handleClick({ vertical: 'top', horizontal: 'right' })();
        }
    },[notification])

    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <>
            <Snackbar
                variant='outlined'
                color="success"
                startDecorator={<Avatar src={sender.avatar} />}
                size='lg'
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                sx={{
                    boxShadow: 'md',
                    borderRadius: 'md',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography fontWeight="bold" color='success'>
                            ข้อความใหม่จาก {sender.custName}
                        </Typography>
                    </Box>
                    <Typography level="body-sm">
                        {sender.contentType === 'text' ? sender.content : 'ส่งรูปภาพ หรือ sicker'}
                    </Typography>
                </Box>

            </Snackbar>
        </>
    )
}

export default App
