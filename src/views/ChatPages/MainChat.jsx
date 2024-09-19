import {Link, useParams} from "react-router-dom";
import {Breadcrumbs, Sheet, Table} from "@mui/joy";
import {ChatPageStyle} from "../../styles/ChatPageStyle.js";
import {useEffect, useState} from "react";
import {ListMessageApi} from "../../api/Messages.js";
import {newMessage} from "../../echo.js";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import {AlertDiaLog} from "../../Dialogs/Alert.js";

export default function MainChat() {
    const {roomId} = useParams();
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const {data, status} = await ListMessageApi(roomId);
                if (status === 200) {
                    setChats(data.chats)
                }
            } catch (error) {
                AlertDiaLog({title: 'เกิดข้อผิดพลาด'})
            }
        }
        fetchChats().then(() => {
            newMessage({
                onPassed: (status, event) => {
                    console.log(status, event);
                }
            });
        });
    }, [roomId]);

    return (
        <>
            <Sheet sx={ChatPageStyle.Layout}>
                <Box component="main" sx={ChatPageStyle.MainContent}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Breadcrumbs size="sm" aria-label="breadcrumbs" sx={{pl: 0}}>
                            <Typography color="primary" sx={{fontWeight: 500, fontSize: 12}}>
                                กำลังสนทนา
                            </Typography>
                            <Typography color="primary" sx={{fontWeight: 500, fontSize: 12}}>
                                กำลังสนทนา
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <Box sx={ChatPageStyle.BoxTable}>
                        <Typography level="h2" component="h1">
                            กำลังสนทนา
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
                                chats.length > 0 ? chats.map((chat, index) => (
                                    <tr key={index}>
                                        <td>John Cina</td>
                                        <td>70010</td>
                                        <td>{new Date().getDate()}</td>
                                        <td>{new Date().getDate()}</td>
                                        <td>
                                            <Link to={'/hello'} target={'_blank'}>Test</Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5}>ไม่มีข้อมูล</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </Sheet>
                    {/**/}
                    <Box sx={ChatPageStyle.BoxTable}>
                        <Typography level="h2" component="h1">
                            รอดำเนินการ
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
                                chats.length > 0 ? chats.map((chat, index) => (
                                    <tr key={index}>
                                        <td>John Cina</td>
                                        <td>70010</td>
                                        <td>{new Date().getDate()}</td>
                                        <td>{new Date().getDate()}</td>
                                        <td>
                                            <Link to={'/hello'} target={'_blank'}>Test</Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5}>ไม่มีข้อมูล</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </Sheet>
                </Box>
            </Sheet>
        </>
    )
}