/* eslint-disable array-callback-return */
/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  let users: Users[];
  beforeEach(() => {
    users = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'johndoe@example.com', phone: '111-2222' },
      { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'janesmith@example.com', phone: '111-3333' },
    ];
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({ json: async () => users } as Response);
    render(
      <>
        {users.map((user) => (
          <Card
            key={user.id}
            name={user.name}
            username={user.username}
            email={user.email}
            phone={user.phone}
            onClick={() => {}}
            autoFocus={false}
          />
        ))}
      </>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the users cards', () => {
    expect(screen.getAllByTestId('card')).toHaveLength(2);
  });

  it('should map data properly', () => {
    const names: HTMLElement[] = screen.getAllByTestId('name');
    const usernames: HTMLElement[] = screen.getAllByTestId('username');
    const emails: HTMLElement[] = screen.getAllByTestId('email');
    const phones: HTMLElement[] = screen.getAllByTestId('phone');
    users.map((user: Users, i) => {
      expect(names[i]).toHaveTextContent(user.name);
      expect(usernames[i]).toHaveTextContent(user.username);
      expect(emails[i]).toHaveTextContent(user.email);
      expect(phones[i]).toHaveTextContent(user.phone);
    });
  });
});
