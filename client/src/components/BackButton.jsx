import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

const BackButton = ({ url }) => {
  return (
    <div>
      <Link to={url} className='btn btn-reverse btn-back'>
        <FaArrowCircleLeft /> Back
      </Link>
    </div>
  );
};

export default BackButton;
