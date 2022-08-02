import Carousel from 'react-material-ui-carousel';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import items from '../../assets/data/bannerItems';

export default function Banner() {
  const [imgSize, setImgSize] = useState({
    width: '',
    height: '',
  });

  const imgRef = useRef();
  const checkSize = () => {
    console.log('width : ' + imgRef.current.width);
    console.log('height : ' + imgRef.current.height);
  };
  const handleResize = () => {
    console.log(`img 사이즈 x: ${imgRef.current.width}, y: ${imgRef.current.height}`);
    checkSize();
    setImgSize({
      width: imgRef.current.width,
      height: imgRef.current.height,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Carousel interval={'6000'} navButtonsAlwaysVisible={'true'} height={imgSize.height}>
        {items.map((item, i) => (
          <Item key={i} item={item} imgRef={imgRef} />
        ))}
      </Carousel>
    </>
  );
}
function Item(props) {
  return (
    <div>
      <img src={props.item.img} alt="banner img" width={'100%'} height={'auto'} ref={props.imgRef} />
    </div>
  );
}
