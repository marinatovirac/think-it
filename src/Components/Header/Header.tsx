import './Header.scss';
import person from '../../images/person.png';

export const Header = ({ username, pageTitle }: { username: string; pageTitle: string }) => {
  return (
    <header className="headerComponent">
      <section className="pageTitle">{pageTitle}</section>
      <section className="userInfo">
        <section className="username">{username}</section>
        <img className="userIcon" src={person} alt="User" />
      </section>
    </header>
  );
};
