import styled from 'styled-components'
import Carousel from 'nuka-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import items from '../../assets/data/bannerItems';

const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  opacity: 60%;
  :hover {
    cursor: pointer;
    opacity: 90%;
  }
  > * {
    color: white;
    font-size: large;
  }
`

export default function Banner() {
  return (
    <>
      <Carousel autoplay={true} autoplayInterval={'4000'} wrapAround={true}
        renderCenterLeftControls={({ previousSlide }) => (
          <Button>
            <ArrowBackIosIcon fontSize='large'  onClick={previousSlide}></ArrowBackIosIcon>
          </Button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <Button>
            <ArrowForwardIosIcon fontSize='large'  onClick={nextSlide}></ArrowForwardIosIcon>
          </Button>
        )}
        defaultControlsConfig={{
          pagingDotsStyle: {
            padding: '0px 3px'
          }
        }}
        >
        {items.map((item, i) => (
          <Item key={i} item={item}/>
        ))}
      </Carousel>
    </>
  );
}
function Item(props) {
  return (
    <div>
      <img src={props.item.img} alt="banner img" width={'100%'} height={'auto'} />
    </div>
  );
}
