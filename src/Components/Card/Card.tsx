import './Card.css';
import person from '../../images/person.png';

export const Card = ({
  name,
  username,
  email,
  phone,
  onClick,
  autoFocus,
}: {
  name: string;
  username: string;
  email: string;
  phone: string;
  onClick: any;
  autoFocus: any;
}) => {
  return (
    <section>
      <button onClick={onClick} className="cardComponent" autoFocus={autoFocus}>
        <section className="userPictureContainer">
          <img src={person} alt="User" />
        </section>
        <section className="cardContent">
          <section className="cardName">{name}</section>
          <section>
            <section className="cardInfo">
              <span className="label">Username:</span> {username}
            </section>
            <section className="cardInfo">
              <span className="label">Email:</span> {email}
            </section>
            <section className="cardInfo">
              <span className="label">Phone:</span> {phone}
            </section>
          </section>
        </section>
      </button>
    </section>
  );
};