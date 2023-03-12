/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from './Table';

describe('Table component', () => {
  let mock = [
    { id: 1, title: 'Title 1', body: 'Body 1' },
    { id: 2, title: 'Title 2', body: 'Body 2' },
  ];
  const userId = 1;
  const activeName = 'User';

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mock,
    } as Response);
    await act(() => {
      render(<Table userId={userId} activeName={activeName} />);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the table with posts', async () => {
    const title1 = screen.getByText('Title 1');
    const title2 = screen.getByText('Title 2');

    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
  });

  it('opens view modal when view button is clicked', async () => {
    const viewButton = screen.getAllByTestId('viewButton');
    mock.map((row, i) => {
      userEvent.click(viewButton[i]);
      const modalTitle = screen.getByTestId('modalTitle');
      const modalBody = screen.getByTestId('modalContent');
      expect(modalTitle).toHaveTextContent(row.title);
      expect(modalBody).toHaveTextContent(row.body);
    });
  });

  it('opens delete modal when delete button is clicked', async () => {
    const deleteButton = screen.getAllByTestId('deleteButton');
    userEvent.click(deleteButton[0]);

    const modalTitle = screen.getByTestId('modalTitle');
    const modalBody = screen.getByTestId('modalContent');

    expect(modalTitle).toHaveTextContent('Delete');
    expect(modalBody).toHaveTextContent('Are you sure you want to delete the item?');
  });
});
