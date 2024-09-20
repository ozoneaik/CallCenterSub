import {Link, useParams} from "react-router-dom";
import {Button, Sheet, Table} from "@mui/joy";
import {ChatPageStyle} from "../../styles/ChatPageStyle.js";
import {useEffect, useState} from "react";
import {ListMessageApi} from "../../api/Messages.js";
import {newMessage} from "../../echo.js";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import {AlertDiaLog} from "../../Dialogs/Alert.js";
import BreadcrumbsComponent from "../../components/Breadcrumbs.jsx";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ChatIcon from '@mui/icons-material/Chat';
import Chip from "@mui/joy/Chip";
import Avatar from "@mui/joy/Avatar";
import {convertDate, getRandomColor} from "../../components/Options.jsx";
import {useNotification} from "../../context/NotiContext.jsx";

const pendingPath = [
    {name: 'ห้องแชทรวม'},
    {name: 'รายละเอียด'}
];

export default function MainChat() {
    const {notification} = useNotification();
    const {roomId} = useParams();
    const [chats, setChats] = useState([]);
    useEffect(() => {
        console.log('useEffect')
        const fetchChats = async () => {
            try {
                const {data, status} = await ListMessageApi(roomId);
                status === 200 &&  setChats(data.chats);
            } catch (error)  {
                AlertDiaLog({title: 'เกิดข้อผิดพลาด'})
            }
        }
        fetchChats().then();
    }, [roomId,notification]);

    const ListTableComponent = ({dataset, title}) => {
        return (
            <>
                <Box sx={ChatPageStyle.BoxTable}>
                    <Typography level="h2" component="h1">
                        {title}
                    </Typography>
                </Box>
                <Sheet variant="outlined" sx={ChatPageStyle.BoxSheet}>
                    <Table stickyHeader hoverRow sx={ChatPageStyle.Table}>
                        <thead>
                        <tr>
                            <th>ชื่อลูกค้า</th>
                            <th>พนักงานรับเรื่อง</th>
                            <th>เวลาเรื่ม</th>
                            <th>เวลาที่สนทนา</th>
                            <th>จัดการ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            dataset.length > 0 ? dataset.map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <Avatar size='sm' sx={{mr: 1}} src={data.sender.avatar}/>
                                            <Typography>
                                                {data.sender.name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <Avatar color={getRandomColor()} size='sm' sx={{mr: 1}}/>
                                            <Typography>
                                                {data.sender.userReply}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td>
                                        <Chip color="warning">
                                            <Typography sx={ChatPageStyle.TableText}>
                                                {convertDate(data.sender.created_at)}
                                            </Typography>
                                        </Chip>
                                    </td>
                                    <td>
                                        <Chip color="primary">
                                            <Typography sx={ChatPageStyle.TableText}>
                                                {convertDate(data.sender.updated_at)}
                                            </Typography>
                                        </Chip>
                                    </td>
                                    <td>
                                        <Button size='sm' variant='outlined' sx={{mr: 1}}
                                                disabled={title === 'กำลังดำเนินการ' && index !== 0}
                                                component={Link} to={`/chat/message/${data.sender.custId}`} target={'_blank'}
                                        >
                                            <ChatIcon/>
                                        </Button>
                                        <Button size='sm' variant='outlined'
                                                color='warning' disabled={title === 'กำลังดำเนินการ' && index !== 0}>
                                            <ManageAccountsIcon/>
                                        </Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} style={{textAlign: 'center'}}>
                                        <Chip color={getRandomColor()}>
                                            ไม่มีข้อมูล
                                        </Chip></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </Sheet>
            </>
        )
    }

    return (
        <>
            <Sheet sx={ChatPageStyle.Layout}>
                <Box component="main" sx={ChatPageStyle.MainContent}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <BreadcrumbsComponent list={pendingPath}/>
                    </Box>
                    <ListTableComponent dataset={chats} title='รอดำเนินการ'/>
                    <ListTableComponent dataset={chats} title='กำลังดำเนินการ'/>
                </Box>
            </Sheet>
        </>
    )
}