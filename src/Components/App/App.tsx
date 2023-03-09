import { useState, useEffect } from 'react';
import './App.css';

import { Table } from '../Table/Table';
import { Card } from '../Card/Card';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';

export default function App() {
  const [users, getUsers] = useState<Users[]>([]);
  const [isActive, setIsActive] = useState<number>(1);
  const [activeName, setActiveName] = useState<string>('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data: Users[]) => {
        getUsers(data.slice(0, 10));
        setActiveName(data[0].name);
      })
      .catch((err) => console.error(err.message));
  }, []);

  const handleCardClick = (id: number, username: string) => {
    setIsActive(id);
    setActiveName(username);
  };

  return (
    <section className="app">
      <Navigation></Navigation>
      <section className="rightSection">
        <Header username="Logged in User" pageTitle="ThinkIT APP"></Header>
        <section className="mainContent">
          <h2>Users</h2>
          <section className="cardList">
            {users.map(({ id, name, username, email, phone }, i) => (
              <Card
                key={id}
                name={name}
                username={username}
                email={email}
                phone={phone}
                onClick={() => handleCardClick(id, name)}
                autoFocus={i === 0}
              />
            ))}
          </section>
          <section>
            <Table userId={isActive} activeName={activeName} key={isActive} />
          </section>
        </section>
      </section>
    </section>
  );
}
