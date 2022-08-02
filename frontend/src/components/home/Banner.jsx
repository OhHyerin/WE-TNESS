import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import items from '../../assets/data/bannerItems';

const bannerHeight = '450px';

export default function Banner() {
  return (
    <>
      {/* 배너 */}
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
    </Paper>
  );
}
