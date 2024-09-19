import * as React from 'react';
import {useEffect, useState} from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, {listItemButtonClasses} from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Logo from '../assets/logo.png'
import ColorSchemeToggle from '../ColorSchemeToggle';
import {closeSidebar} from '../utils';
import {LayoutStyle} from "../styles/LayoutStyle.js";
import {useAuth} from "../context/AuthContext.jsx";
import {AlertDiaLog} from "../Dialogs/Alert.js";
import {logoutApi} from "../api/Auth.js";
import {Link, useNavigate} from "react-router-dom";
import {ChatRoomsApi} from "../api/ChatRooms.js";

export default function Sidebar() {
    const {user, setUser} = useAuth();
    const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchChatRooms = async () => {
            const {data, status} = await ChatRoomsApi();
            status === 200 && setChatRooms(data.chatRooms);
        }
        fetchChatRooms().then(()=>console.log('fetch 👏'));
    }, [])

    const Logout = () => {
        AlertDiaLog({
            text: 'ต้องการออกจากระบบหรือไม่',
            icon: 'info',
            onPassed: async (confirm) => {
                if (confirm) {
                    const {data, status} = await logoutApi();
                    status === 200 && setUser(null)
                    AlertDiaLog({
                        icon: status === 200 ? 'success' : 'error',
                        text: data.message,
                        onPassed: (confirm) => confirm && navigate('/')
                    });
                }
            }
        });
    }


    return (
        <Sheet className="Sidebar" sx={LayoutStyle.Sidebar.Layout}>
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box sx={LayoutStyle.Sidebar.Overlay} onClick={() => closeSidebar()}/>
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <IconButton variant="soft" color="danger" size="sm">
                    <img src={Logo || ''} alt="" width={25}/>
                </IconButton>
                <Typography level="title-lg">Pumpkin Co.</Typography>
                <ColorSchemeToggle sx={{ml: 'auto'}}/>
            </Box>
            <Box sx={{...LayoutStyle.Sidebar.ListItemButton, [`& .${listItemButtonClasses.root}`]: {gap: 1.5,},}}>
                <List size="sm" sx={LayoutStyle.Sidebar.List}>
                    {
                        chatRooms.length > 0 && (
                            chatRooms.map((chatRoom, index) => (
                                <ListItem component={Link} to={`/chat/room/${index}`}>
                                    <ListItemButton>
                                        <QuestionAnswerRoundedIcon/>
                                        <ListItemContent>
                                            <Typography level="title-sm">{chatRoom.name}</Typography>
                                        </ListItemContent>
                                        <Chip size="sm" color="primary" variant="solid">{chatRoom.unReads}</Chip>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        )
                    }

                </List>
                <List size="sm" sx={LayoutStyle.Sidebar.ListButton}>
                    <ListItem>
                        <ListItemButton>
                            <SupportRoundedIcon/>
                            การตั้งค่า
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Divider/>
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <Avatar variant="outlined" size="sm"/>
                <Box sx={{minWidth: 0, flex: 1}}>
                    <Typography level="title-sm">{user.name}</Typography>
                    <Typography level="body-xs">{user.email}</Typography>
                </Box>
                <IconButton onClick={Logout} size="sm" variant="plain" color="neutral">
                    <LogoutRoundedIcon/>
                </IconButton>
            </Box>
        </Sheet>
    );
}