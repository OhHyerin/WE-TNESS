import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    MySwal.fire({
      title: <p>잘못된 요청입니다!</p>,
      icon: 'error',
    }).then(() => {
      navigate('/');
    });
  }, []);
  return <div></div>;
}

export default NotFoundPage;
