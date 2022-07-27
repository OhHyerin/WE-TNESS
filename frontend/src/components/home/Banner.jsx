import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import tutorial from '../../assets/images/banner/tutorial.png';
import ranking from '../../assets/images/banner/ranking.png';

export default function Banner() {
  const items = [
    {
      name: 'Random Name #1',
      img: tutorial,
    },
    {
      name: 'Random Name #2',
      img: ranking,
    },
  ];

  return (
    <div>
      <h2>배너</h2>
      <Carousel>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
}
function Item(props) {
  return (
    <Paper>
      <img src={props.item.img} alt="tutorial img"></img>

      {/* <Button className="CheckButton">Check it out!</Button> */}
    </Paper>
  );
}
