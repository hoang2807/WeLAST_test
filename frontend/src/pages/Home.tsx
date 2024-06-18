import { useQuery } from '@tanstack/react-query';

import Card from '../components/Card';
import { Repository } from '../entities/repo';
import './Home.scss';
import { useState } from 'react';

const Home = () => {
  const [filterLanguage, setFilterLanguage] = useState<string | null>('');

  const { isLoading, error, data } = useQuery({
    queryKey: ['repos'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5000/repos', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      const sortData: Repository[] = responseData.repositories.sort(
        (a: Repository, b: Repository) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      return sortData;
    },
  });

  const language = () => {
    const languageSet: string[] = Array.from(
      new Set(data?.map((repo: Repository) => repo?.language))
    ) as string[];

    return languageSet;
  };

  const filteredData =
    filterLanguage && filterLanguage !== 'null'
      ? data?.filter((repo: Repository) => repo.language === filterLanguage)
      : data;

  return (
    <main>
      <section className="home">
        <div className="container">
          <label htmlFor="language">Choose a language: </label>
          <select
            name="language"
            id="language"
            onChange={(e) => {
              setFilterLanguage(e.target.value);
            }}
          >
            {language()?.map((e: string) => (
              <option key={e} value={`${e}`}>
                {e}
              </option>
            ))}
          </select>
          <div className="list-card">
            {isLoading ? (
              <p>Loading repositories...</p>
            ) : error ? (
              <p>Error fetching repositories: {error.message}</p>
            ) : filteredData && filteredData.length > 0 ? (
              filteredData.map((repo: Repository) => (
                <Card
                  key={repo.id}
                  id={repo.id}
                  name={repo.name}
                  description={repo.description}
                  language={repo.language}
                  forks_count={repo.forks_count}
                  pushed_at={repo.pushed_at}
                />
              ))
            ) : (
              <p>No repositories found.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
