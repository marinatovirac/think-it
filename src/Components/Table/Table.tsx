import { useEffect, useState } from 'react';
import { DeleteModal, ViewModal } from '../Modal/Modals';

import './Table.scss';

export const Table = ({ userId, activeName }: { userId: number; activeName: string }) => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err.message));
  }, [userId]);

  const handleViewClick = (post: Posts) => {
    setSelectedPost(post);
  };

  return (
    <section>
      <h2>{activeName} posts</h2>
      <section className="tblWrapper">
        <table>
          <thead className="tblHeader">
            <tr>
              <th>TITLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody className="tblContent">
            {posts.map(({ id, title, body }) => (
              <tr key={id}>
                <td>{title}</td>
                <td>
                  <button
                    className="viewButton"
                    onClick={() => {
                      setIsViewOpen(true);
                      handleViewClick({ id, title, body });
                    }}
                  >
                    View
                  </button>
                  <button
                    className="deleteButton"
                    onClick={() => {
                      setIsDeleteOpen(true);
                      handleViewClick({ id });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {isViewOpen && <ViewModal setIsViewOpen={setIsViewOpen} selectedPost={selectedPost} />}
      {isDeleteOpen && (
        <DeleteModal
          setIsDeleteOpen={setIsDeleteOpen}
          selectedPost={selectedPost}
          allPosts={posts}
          setPosts={setPosts}
        />
      )}
    </section>
  );
};
