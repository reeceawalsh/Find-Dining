import {Avatar, Stack, Typography} from "@mui/material";

export default function HistoryItem({historyItem}) {
    return (
        <div>
            <div className="dateStyle">
                <Typography variant="subtitle1">
                    {historyItem.date}
                </Typography>
            </div>
            <div classname="restaurantInfo">
                <Avatar variant="rounded" src={historyItem.photo}>
                </Avatar>
                <Typography variant="body1">
                    {historyItem.info}
                </Typography>
            </div>
        </div>
    );
}