import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import tutorial from '../../assets/images/banner/tutorial.png';
import ranking from '../../assets/images/banner/ranking.png';

const bannerHeight = '450px';

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
    <>
      <h2>배너</h2>
      <Carousel height={bannerHeight} interval={'6000'} navButtonsAlwaysVisible={'true'}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
}
function Item(props) {
  return (
    <Paper>
      <img src={props.item.img} alt="tutorial img" height={bannerHeight}></img>

      {/* <Button className="CheckButton">Check it out!</Button> */}
    </Paper>
  );
}
