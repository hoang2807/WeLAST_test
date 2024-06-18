import { Link } from 'react-router-dom';

interface CardProps {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  forks_count: number;
  pushed_at: Date;
}

const Card = (card: CardProps) => {
  const handleLink = () => {
    sessionStorage.setItem('name', card.name);
    if (card.description)
      sessionStorage.setItem('description', card.description);
    sessionStorage.setItem('pushed_at', `${card.pushed_at}`);
  };
  return (
    <div className="item">
      <Link to={`/repo/${card.id}`} onClick={handleLink}>
        {card.name}
      </Link>
      <p className="description">
        <b>Description:</b> {card.description}
      </p>
      <p>
        <b>Language:</b> {card.language}
      </p>
      <p>
        <b>Forks Count:</b>
        {card.forks_count}
      </p>
    </div>
  );
};

export default Card;
