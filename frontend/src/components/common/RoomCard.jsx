import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RoomCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image="" alt="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          제목
        </Typography>
        <Typography variant="body2" color="text.secondary">
          설명
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">입장</Button>
      </CardActions>
    </Card>
  );
}
