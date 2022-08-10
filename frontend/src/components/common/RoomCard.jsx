import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RoomCard(props) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardMedia component="img" height="140" image="" alt="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.room.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <div>{props.room.scope}</div>
          <div>{props.room.workout}</div>
          {props.room.started ? <div>진행중</div> : <div>대기중</div>}
          <div>{props.room.numOfPeople} / 6 </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">입장</Button>
      </CardActions>
    </Card>
  );
}
