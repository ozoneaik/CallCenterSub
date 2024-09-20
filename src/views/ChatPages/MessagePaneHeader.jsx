import {MessageStyle} from "../../styles/MessageStyle.js";
import Stack from "@mui/joy/Stack";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import {Button} from "@mui/joy";
import Chip from "@mui/joy/Chip";
import TelegramIcon from '@mui/icons-material/Telegram';
import AddCommentIcon from '@mui/icons-material/AddComment';

function MessagePaneHeader(props) {
    const {sender} = props;
    return (
        <Stack direction="row" sx={MessageStyle.PaneHeader.Stack}>
            <Stack direction="row" spacing={{xs: 1, md: 2}} sx={{alignItems: 'center'}}>
                <Avatar size="lg" src={sender.avatar}/>
                <div>
                    <Typography component="h2" noWrap sx={MessageStyle.PaneHeader.HeadTitle}>
                        {sender.name}
                    </Typography>
                    <Chip size='sm'>
                        {sender.description}
                    </Chip>
                </div>
            </Stack>
            <Stack spacing={1} direction="row" sx={{alignItems: 'center'}}>
                <Button color='primary' variant="outlined" size="sm" startDecorator={<TelegramIcon/>}>
                    <Typography color='primary' fontSize='small' sx={MessageStyle.PaneHeader.BtnText}>
                        ส่งต่อไปยัง
                    </Typography>
                </Button>
                <Button color='warning' variant="outlined" size="sm" startDecorator={<AddCommentIcon/>}>
                    <Typography color='warning' fontSize='small' sx={MessageStyle.PaneHeader.BtnText}>
                        ตัวช่วยตอบ
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    );
}

export default MessagePaneHeader;