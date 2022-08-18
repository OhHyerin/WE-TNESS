import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import items from '../../assets/data/bannerItems';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createModal } from '../../features/room/RoomSlice';

const MySwal = withReactContent(Swal);

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
`;

const RoomCreateBanner = styled.div`
  :hover {
    cursor: pointer;
  }
`;

export default function Banner() {
  return (
    <>
      <Carousel
        autoplay={true}
        autoplayInterval={'4000'}
        wrapAround={true}
        renderCenterLeftControls={({ previousSlide }) => (
          <Button>
            <ArrowBackIosIcon fontSize="large" onClick={previousSlide}></ArrowBackIosIcon>
          </Button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <Button>
            <ArrowForwardIosIcon fontSize="large" onClick={nextSlide}></ArrowForwardIosIcon>
          </Button>
        )}
        defaultControlsConfig={{
          pagingDotsStyle: {
            padding: '0px 3px',
          },
        }}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </>
  );
}
function Item(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  function handle(e) {
    e.preventDefault();
    if (isAuthenticated) {
      dispatch(createModal(true));
    } else {
      MySwal.fire({
        title: <p>로그인 후 이용 가능합니다.</p>,
        icon: 'info',
      });
      navigate('/login');
    }
  }
  if (props.item.src) {
    return (
      <div>
        <Link to={props.item.src}>
          <img src={props.item.img} alt="banner img" width={'100%'} height={'auto'} />
        </Link>
      </div>
    );
  }
  return (
    <div>
      <RoomCreateBanner onClick={e => handle(e)}>
        <img src={props.item.img} alt="banner img" width={'100%'} height={'auto'} />
      </RoomCreateBanner>
    </div>
  );
}
