import { Link } from 'react-router-dom';
import icon from '/public/vite.svg';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-wrapper">
          <Link to={'/'}>
            <img src={icon} alt="icon" style={{ marginLeft: '20px' }} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
