import { Link } from 'react-router-dom';

const Repository = () => {
  return (
    <section className="detail">
      <div className="container">
        <div className="item">
          <h2>{sessionStorage.getItem('name')}</h2>
          <p>{sessionStorage.getItem('description')}</p>
          <p>{sessionStorage.getItem('pushed_at')}</p>
          <Link to={'/'}>Back</Link>
        </div>
      </div>
    </section>
  );
};

export default Repository;
